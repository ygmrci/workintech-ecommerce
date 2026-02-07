import jerome from "../assets/team/team-jerome.jpg";
import brooklyn from "../assets/team/team-brooklyn.jpg";
import ronald from "../assets/team/team-ronald.jpg";
import floyd from "../assets/team/team-floyd.jpg";
import jane from "../assets/team/team-jane.jpg";
import robert from "../assets/team/team-robert.jpg";
import leslie from "../assets/team/team-leslie.jpg";
import jacob from "../assets/team/team-jacob.jpg";

const teamMembers = [
  { name: "Jerome Bell", role: "IBM", image: jerome },
  { name: "Brooklyn Simmons", role: "eBay", image: brooklyn },
  { name: "Ronald Richards", role: "Starbucks", image: ronald },
  { name: "Floyd Miles", role: "Facebook", image: floyd },
  { name: "Jane Cooper", role: "Mitsubishi", image: jane },
  { name: "Robert Fox", role: "IBM", image: robert },
  { name: "Leslie Alexander", role: "The Walt Disney Company", image: leslie },
  { name: "Jacob Jones", role: "Starbucks", image: jacob },
  { name: "Yagmur Cimen", role: "Full Stack Developer", image: null },
];

const getInitials = (name) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

export default function TeamPage() {
  return (
    <div className="w-full bg-white">
      <section className="w-full">
        <div className="w-full max-w-6xl mx-auto px-4 py-12 md:py-16">
          <div className="flex flex-col items-center text-center gap-2">
            <h1 className="text-[40px] leading-[50px] tracking-[0.2px] md:text-[32px] md:leading-[40px] md:tracking-normal font-bold text-[#252B42]">
              <span className="block md:inline">Meet Our </span>
              <span className="block md:inline">Team</span>
            </h1>
            <p className="text-[14px] text-[#737373] leading-[18px] max-w-[420px] md:block hidden">
              <span className="block">
                Problems trying to resolve the conflict between
              </span>
              <span className="block whitespace-nowrap">
                the two major realms of Classical physics: Newtonian mechanics
              </span>
            </p>
            <p className="text-[12px] text-[#737373] leading-[16px] max-w-[260px] md:hidden">
              <span className="block">Problems trying to resolve</span>
              <span className="block">the conflict between the two major</span>
              <span className="block">realms of Classical physics:</span>
              <span className="block">Newtonian mechanics</span>
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6 place-items-center">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="flex w-full max-w-[280px] flex-col items-start"
              >
                <div className="w-full aspect-square overflow-hidden rounded-[8px] bg-white flex items-center justify-center">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-[28px] font-semibold text-[#252B42]">
                      {getInitials(member.name)}
                    </span>
                  )}
                </div>
                <div className="w-full flex flex-col items-start gap-1 pt-4 pb-2 text-left pl-8">
                  <h3 className="text-[14px] font-semibold text-[#252B42]">
                    {member.name}
                  </h3>
                  <p className="w-full text-left text-[12px] text-[#737373]">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
