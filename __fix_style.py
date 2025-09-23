from pathlib import Path

path = Path("components/home/features-section.tsx")
data = path.read_text(encoding="utf-8")
old = "            backgroundImage:\n              \"url('data:image/svg+xml,%3Csvg width=\\\\\"40\\\\\" height=\\\\\"40\\\\\" viewBox=\\\\\"0 0 40 40\\\\\" xmlns=\\\\\"http://www.w3.org/2000/svg\\\\\"%3E%3Cg fill=\\\\\"%23184434\\\\\" fill-opacity=\\\\\"1\\\\\"%3E%3Ccircle cx=\\\\\"20\\\\\" cy=\\\\\"20\\\\\" r=\\\\\"1\\\\\"/%3E%3C/g%3E%3C/svg%3E')\",\n            backgroundSize: '40px 40px',"
new = "            backgroundImage:\n              \"url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23184434' fill-opacity='1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E\")\",\n            backgroundSize: '40px 40px',"
if old not in data:
    raise SystemExit('pattern not found')
path.write_text(data.replace(old, new), encoding="utf-8")
