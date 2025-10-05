// File: src/components/admin/OrderList.jsx
import React, { useEffect, useState } from "react";
import { Loader2, Eye } from "lucide-react";
import Swal from "sweetalert2";

const API_URL = "http://localhost:3000/service-requests"; // আপনার backend API

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Orders
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setOrders(data.data);
        } else {
          setOrders([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching orders:", err);
        setLoading(false);
      });
  }, []);

  const handleView = (order) => {
    Swal.fire({
      title: `📦 ${order.package.name} Package`,
      html: `
        <p><b>Customer:</b> ${order.name}</p>
        <p><b>Email:</b> ${order.email}</p>
        <p><b>Package:</b> ${order.package.name} ($${order.package.price})</p>
        <p><b>Details:</b> ${order.details}</p>
        <p><b>Date:</b> ${new Date(order.createdAt).toLocaleString()}</p>
      `,
      icon: "info",
    });
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <p className="ml-2 text-gray-600">Loading Orders...</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">No orders found.</p>
      </div>
    );
  }

  return (
    <section className="p-6">
      <h2 className="text-2xl font-bold mb-6">📑 Orders List</h2>
      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="w-full border-collapse">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-center">Package</th>
              <th className="p-4 text-center">Price</th>
              <th className="p-4 text-center">Date</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, idx) => (
              <tr
                key={order._id || idx}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4">{order.name}</td>
                <td className="p-4">{order.email}</td>
                <td className="p-4 text-center">{order.package.name}</td>
                <td className="p-4 text-center">${order.package.price}</td>
                <td className="p-4 text-center">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => handleView(order)}
                    className="flex items-center justify-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-200"
                  >
                    <Eye className="w-4 h-4" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default OrderList;
