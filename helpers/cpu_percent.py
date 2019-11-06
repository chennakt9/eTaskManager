try: 
  import simplejson as json
except:
  import json

import psutil
import time
import sys
#from matplotlib.animation import FuncAnimation
from collections import deque
#from matplotlib import style

#style.use('fivethirtyeight')

cpu = deque([0]*60)

while(True):
    
    final_dict={
    
    }
    cpu.append(psutil.cpu_percent(interval = 1))
    cpu.popleft()
    # print(list(cpu))
    final_dict["key_f"]=list(cpu)
    print(json.dumps(final_dict),flush=False)
    sys.stdout.flush()

