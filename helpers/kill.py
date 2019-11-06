import psutil,sys,json

imp_proc = ["System Idle Process", "System", "Registry", "winlogon.exe", "wininit.exe", "csrss.exe", "smss.exe", "explorer.exe", "ShellExperienceHost.exe", "lsass.exe", "conhost.exe", "lsm.exe", "services.exe", "svchost.exe", "spoolsv.exe", "wdfmgr"]


kill = sys.argv[1]
for j in psutil.process_iter():
    # print(j)
    if j.name() == kill:
        if(kill in imp_proc):
            pass
        else:
            p = psutil.Process(j.pid)
            p.kill()

print(json.dumps(sys.argv[1]))