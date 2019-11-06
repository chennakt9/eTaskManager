import psutil
import json
import sys

final_dict = {
    "children":{},
    "threads":{}
}

try:
    process = psutil.Process(int(sys.argv[1]))

    if process.children() not in [None, []]:
    # print("Children for this process: ")
        c_arr = []
        for child in process.children():
            # print(child)
            c_arr.append(list(child))
        final_dict["children"]["output"] = c_arr
    else:
        final_dict["children"]["error"] = "No child process running"
        # print("No child process running")

    try: 
        if process.threads() not in [None, []]:
            # print("Threads for this process: ")
            t_arr = []
            for thread in process.threads():
                # print(thread)
                t_arr.append(list(thread))
            final_dict["threads"]["output"] = t_arr
        else:
            final_dict["threads"]["error"] = "No threads running under this process"
            # print("No threads running under this process")
    except:
        final_dict["threads"]["access_denied_error"] = "Access Denied to show threads"
        # print("Access Denied to show threads")


except:
    final_dict["error"] = "Error Processing your request"


print(json.dumps(final_dict))