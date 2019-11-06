import time
import json
import sys
import psutil
from collections import deque
#from matplotlib import style

#style.use('fivethirtyeight')
mem = deque([0]*60)

while True :
    final_dict = { }
    mem.append(psutil.virtual_memory()[2])
    mem.popleft()

    final_dict["key_f"]=list(mem)
    print(json.dumps(final_dict))
    sys.stdout.flush()
    time.sleep(1)

