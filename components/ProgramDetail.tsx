import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import * as api from "../lib/api";
import PageHero from "./PageHero";

const ProgramDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [program, setProgram] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      setLoading(true);
      try {
        const data = await api.programsAPI.get();
        const found = data.find(
          (p: any) =>
            p.id === id || p.title.toLowerCase().replace(/\s+/g, "-") === id
        );
        setProgram(found);
      } catch (error) {
        console.error("Failed to fetch program", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPrograms();
  }, [id]);

  if (loading) {
    return (
      <div className="py-32 text-center text-lg text-gray-500">
        Loading Magical Details…
      </div>
    );
  }

  if (!program) {
    return (
      <div className="py-32 text-center">
        <h2 className="text-3xl font-bold text-gray-600 mb-4">
          Program Not Found
        </h2>
        <Link to="/programs" className="text-blue-600 font-semibold underline">
          Return to Programs
        </Link>
      </div>
    );
  }

  return (
    <main className="flex-grow">
      <PageHero title={program.title} />

      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 max-w-5xl">
          {/* ===== OUTER DASHED BOX ===== */}
          <div className="relative group">
            <div
              className="absolute -inset-[3px] border border-dashed 
              border-orange-400/60 rounded-3xl 
              transition-all duration-300 
              group-hover:border-orange-500/80"
            />

            {/* ===== INNER CARD ===== */}
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl">
              {/* Badges */}
              <div className="flex flex-wrap gap-3 mb-8">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Age: {program.ageGroup}
                </span>
                <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Duration: {program.duration}
                </span>
                <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Fee: ₹{program.fee}/mo
                </span>
              </div>

              {/* About */}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                About the Program
              </h2>
              <p className="text-gray-700 leading-relaxed mb-10">
                {program.description}
              </p>

              {/* Benefits */}
              <h3 className="text-xl md:text-2xl font-bold text-orange-600 mb-4">
                Why Parents Love This Program
              </h3>

              <ul className="space-y-3 mb-12">
                {[
                  "Holistic development approach",
                  "Experienced and caring educators",
                  "Safe, nurturing & engaging environment",
                ].map((item) => (
                  <li key={item} className="flex items-center text-gray-700">
                    <span className="w-2.5 h-2.5 bg-orange-400 rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="text-center">
                <Link
                  to="/admissions"
                  className="inline-block px-10 py-4 bg-red-500 text-white 
                  font-semibold rounded-full shadow-lg 
                  hover:bg-red-600 transition-all duration-300"
                >
                  Apply for {program.title}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ProgramDetail;
