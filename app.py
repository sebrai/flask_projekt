from flask import Flask, render_template, request
import mysql.connector
import sys
try:
    with open("password.txt","r")  as f:
        password = f.read()
except FileNotFoundError:
    print("password file doesnt exist")
app =Flask(__name__)



@app.route('/')
def home():
    return render_template('index.html',title="website")

@app.route('/no')
def no():
    return "stop this now that you have the chanse"


@app.route('/hello/<name>')
def hello(name):
    return render_template("hello.html",title="...",ref_name=name)


@app.route('/form', methods=['GET','POST'])
def form():
    if request.method == 'POST':
        navn = request.form['navn']
        color =request.form['color']
        mydb = mysql.connector.connect(
        host = "10.200.14.13",
        port= 3306,
        user = 'extsebrai',
        password = password, 
        database = 'flask'
        )
        mycursor = mydb.cursor()
        mycursor.execute("INSERT INTO users (name,color) VALUES (%s,%s)",(navn,color))
        mydb.commit()
        mycursor.execute("SELECT * FROM users")
        result = mycursor.fetchall()
        mycursor.close()
        mydb.close()
        return render_template('data.html',user=result)
        
    else:
        return render_template('form.html',title="website")

@app.route('/users')
def users():
    mydb = mysql.connector.connect(
    host = "10.200.14.13",
    port= 3306,
    user = 'extsebrai',
    password = password, 
    database = 'flask'
    )
    mycursor = mydb.cursor()
    mycursor.execute("SELECT * FROM users")
    result = mycursor.fetchall()
    return render_template('data.html',user=result)

@app.route('/alter/<name>')
def alter(name):
    return render_template('hello.html',ref_name = name)



@app.route('/delete/<name>')
def delete():
    pass

if __name__ == '__main__':
    app.run(debug =True)



