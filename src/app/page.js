'use client'

import React, { useEffect, useState } from "react";
import axios from '@/utils/axios';

import { FaCalendar } from 'react-icons/fa'

import SelectFilter from "@/components/SelectFilter";
import { DATE_FILTER } from "@/utils/constants";

export default function Home() {
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);

  const [dateFilter, setDateFilter] = useState(DATE_FILTER.TODAY);

  const [minValue, setMinValue] = useState('');
  const [maxValue, setMaxValue] = useState('');

  const [minAmount, setMinAmount] = useState(null);
  const [maxAmount, setMaxAmount] = useState(null);

  const fetchData = async () => {
    try {
      let queryString = dateFilter ? `date=${dateFilter}` : '';
      queryString += minAmount ? `&min_amount=${minAmount}` : '';
      queryString += maxAmount ? `&max_amount=${maxAmount}` : '';

      const res = await axios.get(`/transaction?${queryString}`);

      const data = await res.data.data;
      setTransactions(data);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then();
  }, [dateFilter, minAmount, maxAmount]);

  const dateFilterOptions = [
    { value: DATE_FILTER.ALL, label: 'Tümü' },
    { value: DATE_FILTER.TODAY, label: 'Bugün' },
    { value: DATE_FILTER.YESTERDAY, label: 'Dün' },
    { value: DATE_FILTER.LAST_7_DAYS, label: 'Son 7 Gün' },
    { value: DATE_FILTER.LAST_30_DAYS, label: 'Son 30 Gün' },
    { value: DATE_FILTER.LAST_1_YEARS, label: 'Son 1 Yıl' },
  ];

  const onChangeHandler = (e) => {
    if (e.target.value === dateFilter) {
      return;
    }

    if (!dateFilterOptions.map(option => option.value).includes(e.target.value)) {
      return;
    }

    setDateFilter(e.target.value);
  }

  useEffect(() => {
    const handler = setTimeout(() => {
      setMinAmount(minValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [minValue]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setMaxAmount(maxValue);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [maxValue]);

  return (
    <main className="flex justify-center items-center">
      <div>
        <h1 className="text-center py-4 font-bold text-2xl">History</h1>

        <div className="flex gap-10">
          <SelectFilter icon={<FaCalendar/>} options={dateFilterOptions} onChangeHandler={onChangeHandler}
                        selectedValue={dateFilter}/>

          <div className="flex gap-2">
            <input type="text"
                   placeholder="min amount"
                   value={minValue}
                   onChange={(e) => setMinValue(e.target.value)}
                   className="form-input w-full placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm p-2"/>
            <input type="text"
                   value={maxValue}
                   onChange={(e) => setMaxValue(e.target.value)}
                   placeholder="max amount"
                   className="form-input w-full placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm p-2"/>
          </div>
        </div>

        {loading && <p>Loading...</p>}
        <ul role="list" className="divide-y divide-gray-200">
          {transactions && transactions.map((transaction) => (
            <li className="grid grid-cols-5 items-center py-5" key={transaction.id}>
              <div className="flex items-center gap-2 text-black col-start-1">
                <div className="flex justify-center items-center rounded-full bg-gray-300 w-10 h-10 font-bold">
                  {new Date(transaction.created_at).toLocaleString('default', {day: 'numeric'})}
                </div>
                <div className="text-gray-400 text-sm">
                  {new Date(transaction.created_at).toLocaleString('default', {month: 'short', year: 'numeric'})}
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
