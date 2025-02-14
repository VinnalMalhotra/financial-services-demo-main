import * as React from "react";
import { FC } from "react";

interface TeamMember {
  id: string;
  name: string;
  mainPhone: string;
  emails: string;
  c_primaryCTA: string;
  headshot: { url: string };
}

const TeamCard: FC<TeamMember> = ({ name,  mainPhone, emails, c_primaryCTA, headshot }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 border-b flex items-center space-x-4">
        <img src={headshot.url} alt={name} className="w-16 h-16 rounded-full" />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-600">{}</p>
        </div>
      </div>
      <div className="p-4">
        <div className="text-sm text-gray-700 space-y-1">
          <p className="flex items-center gap-2 text-green-700">📞 <span>{mainPhone}</span></p>
          <p className="flex items-center gap-2 text-green-700">✉️ <a href={`mailto:${emails}`} className="underline">{emails}</a></p>
        </div>
        <a href={c_primaryCTA} className="mt-2 text-blue-600 flex items-center gap-1 hover:underline">
          🌐 Visit Profile ➝
        </a>
      </div>
    </div>
  );
};

interface TeamSectionProps {
  teamdata: TeamMember[];
}

const TeamSection: FC<TeamSectionProps> = ({ teamdata }) => {
  return (
    <section className="py-10 bg-gray-100">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Meet Our Team</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {teamdata.map((member, index) => (
          <TeamCard key={index} {...member} />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
