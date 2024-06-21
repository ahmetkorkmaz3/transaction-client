'use client'

import React, {useEffect, useState} from 'react';
import axios from "@/utils/axios";
import {useRouter} from 'next/navigation'
import Link from "next/link";

export default function Detail({params}) {
  const router = useRouter();

  const [loading, setLoading] = useState(true)
  const [transaction, setTransaction] = useState(null)

  const dateOption = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/transaction/${params.uid}`);

        const data = await res.data.data;
        setTransaction(data);
      } catch (error) {
        await router.push('/')
      } finally {
        setLoading(false);
      }
    }

    fetchData().then()
  }, [params.uid, router]);

  return (
    <div>
      {loading && (<p className="flex justify-center items-center">Loading...</p>)}
      {transaction && (
        <div className="py-24 relative">
          <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
            <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center mb-11">
              Detay
            </h2>
            {transaction.description &&
              (<p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">{transaction.description}</p>)}
            <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
              <div
                className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                <div className="data">
                  {transaction.order_id && (
                    <p className="font-semibold text-base leading-7 text-black">Sipariş Numarası: <span
                      className="text-indigo-600 font-medium">#{transaction.id}</span></p>)}
                  <p className="font-semibold text-base leading-7 text-black mt-4">Tarih:
                    <span
                      className="ml-2 text-gray-400 font-medium">{new Date(transaction.created_at).toLocaleDateString('tr-TR', dateOption)}</span>
                  </p>
                </div>
                {transaction.receipt_url && (
                  <Link
                    href={transaction.receipt_url}
                    className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                    Fatura</Link>
                )}
              </div>

              <div
                className="flex flex-col lg:flex-row lg:items-center justify-between pt-6 px-6 pb-6 border-b border-gray-200">
                <div className="data">
                  {transaction.point.asInt > 0 && (
                    <p className="font-semibold text-base leading-7 text-black">Puan: <span
                      className="text-gray-400 font-medium">{transaction.point.asString}</span></p>)}
                  <p className="font-semibold text-base leading-7 text-black mt-4">Tip:
                    <span
                      className="ml-2 text-gray-400 font-medium">{transaction.type_name}</span>
                  </p>
                </div>
                <div className="data">
                  {transaction.amount.asInt > 0 && (
                    <div>
                      <p className="font-semibold text-base leading-7 text-black">Tutar: </p>
                      <p className={"font-semibold text-base leading-7 text-black mt-4 " + (transaction.type === 'spending' ? 'text-red-600' : 'text-green-600')}>{(transaction.type === 'spending' ? '-' : '+')}{transaction.amount.asString}</p>
                    </div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
