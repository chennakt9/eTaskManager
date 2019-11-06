import psutil
import json
import sys, time

a = psutil.Process(int(sys.argv[1]))
while(True):
    final_dict = {
    "children":{},
    "threads":{}
    }

    
    try: 
        if a.threads() != []:
            t_arr = []
            for threads in a.threads():
                t_arr.append(list(threads))
            
                # print(threads) 
            # print(t_arr)
            final_dict["threads"]["output"] = t_arr
        else:
            # print("No threads are running")
            final_dict["threads"]["error"] = "No threads running under this process"
    except:
        # print("Access Denied")
        final_dict["threads"]["access_denied_error"] = "Access Denied"
    try:
        if a.children() != []:
            c_arr = []
            for child in a.children():
                # print(child)
                td = child.as_dict(attrs = ['name', 'pid', 'ppid', 'username', 'cpu_percent', 'status', 'memory_percent','num_threads'])
                td['cpu_percent'] = round(td['cpu_percent'], 2)
                td['memory_percent'] = round(td['memory_percent'], 2)
                c_arr.append(td)
                # c_arr.append(child)
            # print(c_arr)
            final_dict["children"]["output"] = c_arr
        else:
            # print("No children process are running")
            final_dict["children"]["error"] = "No child process running"
    except:
        # print("Access Denied")
        final_dict["children"]["access_denied_error"] = "Access Denied"
    print(json.dumps(final_dict),flush=False)
    sys.stdout.flush()
    time.sleep(0.2)

# print(final_dict)
