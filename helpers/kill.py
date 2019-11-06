import psutil,sys,json

kill = sys.argv[1]
for j in psutil.process_iter():
    # print(j)
    if j.name() == kill:
        p = psutil.Process(j.pid)
        p.kill()

print(json.dumps(sys.argv[1]))