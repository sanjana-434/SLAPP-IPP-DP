from flask import Flask, jsonify, request
from flask_cors import CORS  # Import Flask-CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for the entire app

orders = []

def M(OrderSet,SLA,O):   #Minimum SLA
  m=[]
  for i in range(len(SLA)):
    costOfAllOrders=0
    for j in OrderSet:
      for k in range(len(O[j])):
        costOfAllOrders+=SLA[i+1][k]*O[j][k]
    m.append(costOfAllOrders)
  return m.index(min(m))+1

def L(A,OrderSet,SLA,O):
  v=0
  for i in OrderSet:
    for j in range(len(SLA[A])):
      v+=SLA[A][j]*O[i][j]
  return v

def SLAPP(O):
    items = ['A','B','C']
    T= len(O)
    # O={
    #     1:[3,2,5],
    #     2:[2,2,1],
    #     3:[0,1,1],
    #     4:[1,0,2],
    #     5:[0,1,0]
    # }
    num_SLA = 3
    SLA = {1 : [6,2,5],2:[5,4,1],3:[2,5,5]}  # travel distance for Order picking
    C = 50                                         # travel distance for reassignment
    # Memoization
    dp_SLA = [-1]*(T+1) # optimal SLA
    dp_F = [-1] *(T+1)  # F value
    dp_x = [0]*(T+1)   # decision variable

    dp_SLA[0] = 1
    dp_F[0] = 0
    dp_x[0] = 1
    for i in range(1,T+1):
      print('----------------------------')
      print('i : ',i)
      t=[]
      s=[]
      orderset = [_ for _ in range(1,i+1)]
      print(dp_x)
      for j in range(i):
        t.append(dp_F[j]+L(dp_SLA[j],orderset[j:],SLA,O))
        s.append(dp_SLA[j])
        a=M(orderset[j:],SLA,O)
        t.append(dp_F[j]+L(a,orderset[j:],SLA,O)+C)
        s.append(a)
      l=t.index(min(t))
      dp_SLA[i] = s[l]
      dp_F[i]=min(t)
      print('t index: ',l)
      if(l%2):
        dp_x[i] = 1
      print(t,s)
    print(dp_SLA)
    print(dp_F)
    print(dp_x)
    return dp_x

@app.route("/api/orders", methods=["GET", "POST"])
def manage_orders():
    if request.method == "GET":
        return jsonify(orders)
    elif request.method == "POST":
        order = request.json
        orders.append(order)
        print(orders)
        O = {}
        index = 1
        for i in orders[0]:
            print(i)
            l = list(i.values())
            O[index] = l
            index+=1
        print("\n\n")
        print("O : ",O)

        ans = SLAPP(O)

        response = {"message": "Order added successfully", "x": ans}
        return jsonify(response)

if __name__ == "__main__":
    app.run()
