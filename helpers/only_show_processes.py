import psutil, time, sys
import json


while(True):
  final_dict={
    "key_f":[]
  }
  for j in psutil.process_iter():
    if j.name() != "System Idle Process":
      temp_dictin = j.as_dict(attrs = ['name', 'pid', 'cpu_percent', 'status', 'memory_percent'])
      temp_dictin['cpu_percent'] = round(temp_dictin['cpu_percent'], 2)
      temp_dictin['memory_percent'] = round(temp_dictin['memory_percent'], 2)
      final_dict["key_f"].append(temp_dictin)
      # print(json.dumps(obj),flush=False)    
      
  print(json.dumps(final_dict),flush=False)
  sys.stdout.flush()
  time.sleep(0.1)