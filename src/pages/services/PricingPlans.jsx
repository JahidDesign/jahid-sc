// File: src/components/PricingPlans.jsx
import React, { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AuthContext } from "../../context/AuthContext";
import { CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const MySwal = withReactContent(Swal);

const plans = [
  {
    name: "Basic",
    price: 120,
    save: "Save up to 10% with Subscribe to Save",
    description:
      "Quick Development – Design 1 page website development or custom code website without API integration (Static).",
    delivery: "3-day delivery",
    revisions: "Unlimited Revisions",
    features: [
      "Functional website",
      "Content upload",
      "Hosting setup",
      "Social media icons",
      "5 plugins/extensions installation",
      "Up to 8 products",
    ],
  },
  {
    name: "Standard",
    price: 350,
    save: "Save up to 10% with Subscribe to Save",
    description:
      "Prose Development – Develop 3-4 page website following reference/design, with basic API integrations and custom/CMS website.",
    delivery: "7-day delivery",
    revisions: "Unlimited Revisions",
    features: [
      "Functional website",
      "Content upload",
      "Opt-in form",
      "Speed optimization",
      "8 plugins/extensions installation",
      "Up to 10 products",
      "Custom/CMS integration",
    ],
  },
  {
    name: "Premium",
    price: 650,
    save: "Save up to 10% with Subscribe to Save",
    description:
      "Custom Development – Develop 6-8 page custom website frontend with API integrations following client’s design (Scalable).",
    delivery: "14-day delivery",
    revisions: "Unlimited Revisions",
    features: [
      "Functional website",
      "Content upload",
      "E-commerce functionality",
      "Payment integration",
      "Autoresponder integration",
      "Speed optimization",
      "Hosting setup",
      "10 plugins/extensions installation",
      "Up to 12 products",
      "Scalable frontend with APIs",
    ],
  },
];

const PricingPlans = () => {
  const [expanded, setExpanded] = useState(null);
  const [quantities, setQuantities] = useState(plans.map(() => 1));
  const { user } = useContext(AuthContext);

  const handleCardQuantityChange = (index, value) => {
    const newQuantities = [...quantities];
    newQuantities[index] = value;
    setQuantities(newQuantities);
  };

  const handleBookNow = async (plan, initialQty) => {
    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please log in to book a package.",
      });
      return;
    }

    const featuresHtml = plan.features
      .map((f) => `<li style="margin-bottom: 4px;">✅ ${f}</li>`)
      .join("");

    const { value: formValues } = await MySwal.fire({
      title: <strong>Book {plan.name}</strong>,
      html: (
        <div style={{ textAlign: "left" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
            <img
              src={user.photoURL}
              alt={user.displayName}
              style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover" }}
            />
            <strong>{user.displayName}</strong>
          </div>
          <p><strong>Description:</strong> {plan.description}</p>
          <p>⏱ <strong>Delivery:</strong> {plan.delivery} | ♻️ <strong>Revisions:</strong> {plan.revisions}</p>
          <p><strong>Features:</strong></p>
          <ul style={{ maxHeight: "100px", overflowY: "auto", marginBottom: "10px" }} dangerouslySetInnerHTML={{ __html: featuresHtml }} />
          <input type="number" id="quantity" className="swal2-input" placeholder="Quantity" defaultValue={initialQty} min="1"/>
          <textarea id="notes" className="swal2-textarea" placeholder="Notes / Special Instructions"></textarea>
          <input type="text" id="delivery" className="swal2-input" placeholder="Custom Delivery Date / Option" defaultValue={plan.delivery}/>
        </div>
      ),
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: "Confirm Booking",
      width: 600,
      preConfirm: () => {
        const qty = parseInt(document.getElementById("quantity").value);
        const notes = document.getElementById("notes").value;
        const delivery = document.getElementById("delivery").value;
        if (!qty || qty < 1) {
          Swal.showValidationMessage("Quantity must be at least 1");
        }
        return { qty, notes, delivery };
      },
    });

    if (!formValues) return;

    const bookingData = {
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,
      planName: plan.name,
      planPrice: plan.price,
      planDescription: plan.description,
      planDelivery: formValues.delivery,
      planRevisions: plan.revisions,
      planFeatures: plan.features,
      quantity: formValues.qty,
      notes: formValues.notes,
      totalPrice: plan.price * formValues.qty,
    };

    try {
      await axios.post("http://localhost:3000/bookServices", bookingData);
      Swal.fire({
        icon: "success",
        title: "Booking Confirmed",
        html: `Successfully booked <strong>${plan.name}</strong>!<br>Total: $${plan.price * formValues.qty}`,
      });
    } catch (error) {
      console.error("Booking error:", error);
      Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: "Failed to book the service. Please try again.",
      });
    }
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-black mb-10">
          Compare Packages
        </h2>

        {!user && (
          <p className="text-center text-red-500 mb-6">
            Please log in to book a package.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              className="bg-white text-black shadow-lg rounded-2xl p-6 border flex flex-col hover:shadow-2xl transition hover:-translate-y-1"
              whileHover={{ y: -2 }}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <span className="text-2xl font-extrabold text-black">
                  ${plan.price}
                </span>
              </div>

              <p className="text-green-600 text-sm mt-1">💰 {plan.save}</p>
              <p className="text-gray-800 mt-3">{plan.description}</p>

              <div className="mt-4 flex flex-col gap-1 text-sm">
                <p>⏱ <strong>{plan.delivery}</strong></p>
                <p>♻️ <strong>{plan.revisions}</strong></p>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <label className="text-sm font-medium">Qty:</label>
                <input
                  type="number"
                  min={1}
                  value={quantities[idx]}
                  onChange={(e) => handleCardQuantityChange(idx, Number(e.target.value))}
                  className="w-16 border border-gray-300 rounded-lg p-1 text-center focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <p className="mt-2 font-semibold text-lg">
                Total: ${plan.price * quantities[idx]}
              </p>

              <button
                onClick={() => handleBookNow(plan, quantities[idx])}
                disabled={!user}
                className={`mt-3 w-full py-2 rounded-lg transition ${
                  user
                    ? "bg-black text-white hover:bg-gray-800"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Book Now
              </button>

              <button
                onClick={() => setExpanded(expanded === idx ? null : idx)}
                className="mt-3 w-full bg-gray-200 text-black py-2 rounded-lg hover:bg-gray-300 transition"
              >
                {expanded === idx
                  ? "Hide What's Included"
                  : "Show What's Included"}
              </button>

              <AnimatePresence>
                {expanded === idx && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 flex flex-col gap-4"
                  >
                    <ul className="space-y-3">
                      {plan.features.map((feature, fIdx) => (
                        <li
                          key={fIdx}
                          className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg shadow-sm hover:bg-gray-200 transition"
                        >
                          <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" />
                          <span className="text-gray-800">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
