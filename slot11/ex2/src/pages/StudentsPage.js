import React, { useState, useMemo } from "react";
import { students as data } from "../data/Students";
import AppNavbar from "../components/Navbar";
import Hero from "../components/Hero";
import Filters from "../components/Filters";
import SortDropdown from "../components/SortDropdown";
import StudentGrid from "../components/StudentGrid";
import StudentDetailModal from "../components/StudentDetailModal";
import Footer from "../components/Footer";

function StudentsPage() {
  const [search, setSearch] = useState("");
  const [filterAge, setFilterAge] = useState("");
  const [hasAvatar, setHasAvatar] = useState(false);
  const [sortOption, setSortOption] = useState("");
  const [selected, setSelected] = useState(null);

  const filteredStudents = useMemo(() => {
    return data
      .filter((s) => {
        const matchSearch =
          s.name.toLowerCase().includes(search.toLowerCase()) ||
          s.email.toLowerCase().includes(search.toLowerCase());
        const matchAge =
          filterAge === "" ||
          (filterAge === "<=20" && s.age <= 20) ||
          (filterAge === "21-25" && s.age >= 21 && s.age <= 25) ||
          (filterAge === ">25" && s.age > 25);
        const matchAvatar = !hasAvatar || (hasAvatar && s.avatar);
        return matchSearch && matchAge && matchAvatar;
      })
      .sort((a, b) => {
        switch (sortOption) {
          case "age-asc":
            return a.age - b.age;
          case "age-desc":
            return b.age - a.age;
          case "name-asc":
            return a.name.localeCompare(b.name);
          case "name-desc":
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
  }, [search, filterAge, hasAvatar, sortOption]);

  return (
    <div>
      <AppNavbar search={search} setSearch={setSearch} />
      <Hero />
      <div className="sm:px-4 md:px-6 lg:px-10">
        <Filters
          filterAge={filterAge}
          setFilterAge={setFilterAge}
          hasAvatar={hasAvatar}
          setHasAvatar={setHasAvatar}
        />
        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} />
        <div className="p-3">
          {filteredStudents.length > 0 ? (
            <StudentGrid students={filteredStudents} onView={setSelected} />
          ) : (
            <p className="text-center text-gray-500 text-lg font-medium py-6">
              No results found
            </p>
          )}
        </div>
      </div>
      <StudentDetailModal
        student={selected}
        show={!!selected}
        onHide={() => setSelected(null)}
      />
      <Footer />
    </div>
  );
}

export default StudentsPage;
