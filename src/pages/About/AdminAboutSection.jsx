import React from "react"
import AdminTableCRUD from "./AdminAboutMeTable.jsx";
import AdminAboutTable from "./AdminAboutTable.jsx";
const AdminAboutSection = () => {
 
  return (
    <section className="relative bg-gray-100">
     <AdminTableCRUD/>
     <AdminAboutTable/>
    </section>
  );
};

export default AdminAboutSection;
