import multiprocessing
import datetime
import urllib
import json
import sys
import random
print len(sys.argv)
if len(sys.argv) != 5:
    print 'Inputs: <IP-servidor> <rondas(secuenciales)> <concurrentes> <metodo CRUD>'
    exit()

operacion = ['/create_libro','/read_libro','/update_libro','/delete_libro']

ip = sys.argv[1]
rondas = int(sys.argv[2])
concurrentes = int(sys.argv[3])
crud_op = int(sys.argv[4])

url = 'http://'+ip+'/libro'

print 'obteniedo array de palabras'
word_site = "http://svnweb.freebsd.org/csrg/share/dict/words?view=co&content-type=text/plain"
response = urllib.urlopen(word_site)
txt = response.read()
WORDS = txt.splitlines()

if crud_op == 0:
    print 'solo operaciones CREATE'
if crud_op == 1:
    print 'solo operaciones READ'
if crud_op == 2:
    print 'solo operaciones UPDATE'
if crud_op == 3:
    print 'solo operaciones DELETE'
if crud_op == 4:
    print 'solo operaciones UPDATE'

def get_create():
    titulo = WORDS[random.randint(0, len(WORDS)-1)]
    autor =  WORDS[random.randint(0, len(WORDS)-1)]
    editorial = WORDS[random.randint(0, len(WORDS)-1)]
    isbn = str(random.randint(1, 9))+str(random.randint(1, 9))+str(random.randint(1, 9))+'-'+str(random.randint(1, 9))+str(random.randint(1, 9))+str(random.randint(1, 9))
    output ='?titulo='+titulo+'&autor='+autor+'&editorial='+editorial+'&isbn='+isbn
    return output



def get_read():
    titulo = WORDS[random.randint(0, len(WORDS)-1)]
    output = '?titulo='+titulo
    return output

def get_update():
    titulo = WORDS[random.randint(0, len(WORDS)-1)]
    autor =  WORDS[random.randint(0, len(WORDS)-1)]
    editorial = WORDS[random.randint(0, len(WORDS)-1)]
    isbn = str(random.randint(1, 9))+str(random.randint(1, 9))+str(random.randint(1, 9))+'-'+str(random.randint(1, 9))+str(random.randint(1, 9))+str(random.randint(1, 9))
    output ='?titulo='+titulo+'&autor='+autor+'&editorial='+editorial+'&isbn='+isbn
    return output

def get_delete():
    isbn = str(random.randint(1, 9))+str(random.randint(1, 9))+str(random.randint(1, 9))+'-'+str(random.randint(1, 9))+str(random.randint(1, 9))+str(random.randint(1, 9))
    output = '?isbn='+isbn
    return output


def get_server_op():
    if crud_op == 0:
        op = url+operacion[crud_op]+get_create()
        return op
    if crud_op == 1:
        op = url+operacion[crud_op]+get_read()
        return op
    if crud_op == 2:
        op = url+operacion[crud_op]+get_update()
        return op
    if crud_op == 3:
        op = url+operacion[crud_op]+get_delete()
        return op
    if crud_op == 4:
        randomico = random.randint(0, 3)
        if randomico == 0:
            op = url+operacion[randomico]+get_create()
            return op
        if randomico == 1:
            op = url+operacion[randomico]+get_read()
            return op
        if randomico == 2:
            op = url+operacion[randomico]+get_update()
            return op
        if randomico == 3:
            op = url+operacion[randomico]+get_delete()
            return op

        




def worker():
    final_url = get_server_op()
    response = urllib.urlopen(final_url)
    try:
        data = json.loads(response.read())
    except ValueError:
        print ValueError

def tiempo_total(init,end):
    timeDiff = end-init
    return timeDiff.seconds

def start_bench():
    time_init = datetime.datetime.now()
   
    
    if __name__ == '__main__':
        for i in range(rondas):
            jobs = []
            for j in range(concurrentes):
                p = multiprocessing.Process(target=worker)
                jobs.append(p)
                p.start()
            for t in jobs:
                t.join()
            print 'fin ronda ==>'+str(i)

    time_end = datetime.datetime.now()
    time_diff = tiempo_total(time_init,time_end)
    print 'iniciando benchmark'
    print time_init
    print 'tiempo fin'
    print time_end
    print 'tiempo total (seg)'
    print time_diff

start_bench()