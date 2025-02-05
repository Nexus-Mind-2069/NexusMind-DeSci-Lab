from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    return jsonify({"message": "Welcome to NexusMind DeSci Lab API"})

@app.route('/api/papers')
def get_papers():
    # Это заглушка. В реальном приложении вы бы получали данные из базы данных.
    papers = [
        {"id": 1, "title": "Quantum Entanglement in Decentralized Networks", "author": "Alice Quantum"},
        {"id": 2, "title": "AI-Driven Analysis of Climate Data", "author": "Bob Climate"}
    ]
    return jsonify(papers)

if __name__ == '__main__':
    app.run(debug=True)
