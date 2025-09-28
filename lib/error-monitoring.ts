/**
 * Error Monitoring and Reporting Utilities
 * Centralizes error logging and monitoring for better production debugging
 */

interface ErrorContext {
  userId?: string
  requestId?: string
  component?: string
  action?: string
  url?: string
  userAgent?: string
  timestamp: string
  environment: string
  [key: string]: any
}

interface ErrorReport {
  message: string
  stack?: string
  name: string
  status?: number
  context: ErrorContext
}

class ErrorMonitor {
  private static instance: ErrorMonitor
  private errorQueue: ErrorReport[] = []
  private isFlushingErrors = false

  static getInstance(): ErrorMonitor {
    if (!ErrorMonitor.instance) {
      ErrorMonitor.instance = new ErrorMonitor()
    }
    return ErrorMonitor.instance
  }

  /**
   * Report an error with context
   */
  reportError(error: Error | unknown, context: Partial<ErrorContext> = {}) {
    const errorReport: ErrorReport = {
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      name: error instanceof Error ? error.name : 'UnknownError',
      status: (error as any)?.status,
      context: {
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        url: typeof window !== 'undefined' ? window.location.href : undefined,
        userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined,
        ...context,
      },
    }

    // Log to console immediately
    this.logError(errorReport)

    // Add to queue for potential batch reporting
    this.errorQueue.push(errorReport)

    // Flush periodically or when queue is full
    if (this.errorQueue.length >= 10) {
      this.flushErrors()
    }
  }

  /**
   * Log error to console with proper formatting
   */
  private logError(errorReport: ErrorReport) {
    const { message, name, status, context } = errorReport

    console.group(`🚨 Error Report [${context.timestamp}]`)
    console.error(`${name}: ${message}`)

    if (status) {
      console.error(`HTTP Status: ${status}`)
    }

    if (context.component) {
      console.error(`Component: ${context.component}`)
    }

    if (context.action) {
      console.error(`Action: ${context.action}`)
    }

    if (context.requestId) {
      console.error(`Request ID: ${context.requestId}`)
    }

    if (context.url) {
      console.error(`URL: ${context.url}`)
    }

    if (errorReport.stack && process.env.NODE_ENV === 'development') {
      console.error('Stack trace:', errorReport.stack)
    }

    console.groupEnd()
  }

  /**
   * Flush errors to external monitoring service
   */
  private async flushErrors() {
    if (this.isFlushingErrors || this.errorQueue.length === 0) {
      return
    }

    this.isFlushingErrors = true
    const errorsToFlush = [...this.errorQueue]
    this.errorQueue = []

    try {
      // In production, send to monitoring service
      if (process.env.NODE_ENV === 'production') {
        console.log(`📊 Would send ${errorsToFlush.length} errors to monitoring service`)

        // TODO: Implement actual error reporting
        // Examples:
        // - Send to Sentry
        // - Send to custom error tracking endpoint
        // - Send to LogRocket, DataDog, etc.

        // await this.sendToMonitoringService(errorsToFlush)
      }
    } catch (flushError) {
      console.error('Failed to flush errors to monitoring service:', flushError)
      // Re-add errors to queue for retry
      this.errorQueue.unshift(...errorsToFlush)
    } finally {
      this.isFlushingErrors = false
    }
  }

  /**
   * Report portfolio-specific errors
   */
  reportPortfolioError(error: Error | unknown, action: string, additionalContext: Record<string, any> = {}) {
    this.reportError(error, {
      component: 'Portfolio',
      action,
      ...additionalContext,
    })
  }

  /**
   * Report API errors with request details
   */
  reportApiError(error: Error | unknown, endpoint: string, method: string, requestId?: string) {
    this.reportError(error, {
      component: 'API',
      action: `${method} ${endpoint}`,
      requestId,
      endpoint,
      method,
    })
  }
}

// Export singleton instance
export const errorMonitor = ErrorMonitor.getInstance()

// Convenience functions
export const reportError = (error: Error | unknown, context?: Partial<ErrorContext>) => {
  errorMonitor.reportError(error, context)
}

export const reportPortfolioError = (error: Error | unknown, action: string, context?: Record<string, any>) => {
  errorMonitor.reportPortfolioError(error, action, context)
}

export const reportApiError = (error: Error | unknown, endpoint: string, method: string, requestId?: string) => {
  errorMonitor.reportApiError(error, endpoint, method, requestId)
}

// Global error handler for unhandled promise rejections
if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    reportError(event.reason, {
      component: 'GlobalHandler',
      action: 'unhandledrejection',
    })
  })

  window.addEventListener('error', (event) => {
    reportError(event.error || event.message, {
      component: 'GlobalHandler',
      action: 'globalError',
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
    })
  })
}