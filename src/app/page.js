'use client'

import React, {useEffect, useState} from "react";
import axios from "axios";

export default function Home() {
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/v1/transaction');

        const data = await res.data.data;
        setTransactions(data);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    };

    fetchData().then();
  }, []);

  return (
    <main className="flex justify-center items-center">
      <div>
        <h1>History</h1>
        {loading && <p>Loading...</p>}
        <ul role="list" className="divide-y divide-gray-200">
          {transactions && transactions.map((transaction) => (
            <li className="grid grid-cols-5 items-center py-5" key={transaction.id}>
              <div className="flex items-center gap-2 text-black col-start-1">
                <div className="flex justify-center items-center rounded-full bg-gray-300 w-10 h-10 font-bold">
                  {new Date(transaction.created_at).toLocaleString('default', { day: 'numeric' })}
                </div>
                <div className="text-gray-400 text-sm">
                  {new Date(transaction.created_at).toLocaleString('default', { month: 'short', year: 'numeric' })}
                </div>
              </div>

              <div className="flex flex-col col-start-2 col-end-3">
                <div className="font-bold">{transaction.type_name}</div>
                {transaction.order_id && <a href="#" className="text-gray-500 underline text-sm">#{transaction.order_id}</a>}
              </div>

              {transaction.point.asInt > 0 && (
                <div className="text-sm text-gray-500 col-start-3 col-end-4">
                  -{transaction.point.asString} Karaca Kalbi
                </div>
              )}

              <div className={transaction.type === 'spending' ? 'text-red-600 col-start-5' : 'text-green-600 col-start-5'}>
                {transaction.type === 'spending' ? '-' : '+'}
                {transaction.amount.asString}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
