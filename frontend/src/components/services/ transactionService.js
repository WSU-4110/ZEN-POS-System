export async function fetchTransactions() {
    const res = await fetch('http://localhost:8080/api/transactions');
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}

export async function postTransaction(transaction) {
    const res = await fetch('http://localhost:8080/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction),
    });
    if (!res.ok) throw new Error(res.statusText);
    return res.json();
}
