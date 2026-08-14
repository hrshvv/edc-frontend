import React from 'react';
import { motion } from 'framer-motion';
import { Building2 } from 'lucide-react';

const SPONSORS = [
  { id: 1, type: 'Title Sponsor', name: 'Go-Daddy', logo: 'https://res.cloudinary.com/dh8cqlngr/image/upload/v1786706246/sponsor-Title-Sponsor-None.jpg_ichxzw.jpg' },
  { id: 2, type: 'Co-Title Sponsor', name: 'Westbride-Capital', logo: 'https://res.cloudinary.com/dh8cqlngr/image/upload/v1786706246/sponsor-Co-Title_Sponsor-26_nkonsv.png' },
  { id: 3, type: 'Brought to you by', name: 'Voltas', logo: 'https://res.cloudinary.com/dh8cqlngr/image/upload/v1786706246/sponsor-Brought_To_You_By-None.jpg_zcqmzk.jpg' },
  { id: 4, type: 'Powered by', name: 'Fedex', logo: 'https://res.cloudinary.com/dh8cqlngr/image/upload/v1786706246/sponsor-Powered_By-None_jBTzi7c_ylngic.png' },
  { id: 5, type: 'Global event partner', name: 'Gll', logo: 'https://res.cloudinary.com/dh8cqlngr/image/upload/v1786706245/sponsor-Global_investment_partner-None_V0jLtUZ_pp5flf.png' },
  { id: 6, type: 'Digital Health care partner', name: 'KCDH', logo: 'https://res.cloudinary.com/dh8cqlngr/image/upload/v1786706247/sponsor-Digital_Healthcare_Partner-None_vtcavr.png' },
  { id: 7, type: 'Healthcare partner', name: 'Redesign Health', logo: 'https://res.cloudinary.com/dh8cqlngr/image/upload/v1786706246/sponsor-Healthcare_Partner-None_i0wqkj.jpg' },
  { id: 8, type: 'Partner', name: 'JSS STEP', logo: 'https://res.cloudinary.com/dh8cqlngr/image/upload/v1786652363/image-Photoroom_kpa7ju.png' },
  { id: 9, type: '', name: 'JSS UNIVERSITY', logo: 'https://res.cloudinary.com/dh8cqlngr/image/upload/v1786707566/1784259493017_wnlopr.jpg' },
];

const SponsorLogo = ({ sponsor, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay: 0.35 + index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    className="group relative flex-shrink-0"
  >
    <div
      className="relative inline-flex w-fit h-fit overflow-hidden rounded-lg border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:border-[#05B1DE]/40 group-hover:bg-[#05B1DE]/[0.06] group-hover:shadow-[0_0_24px_rgba(5,177,222,0.18)]"
      aria-label={sponsor.type ? `${sponsor.type} ${sponsor.name}` : sponsor.name}
    >
      {sponsor.logo ? (
        <img
          src={sponsor.logo}
          alt={sponsor.name}
          className="block h-auto w-auto max-h-10 sm:max-h-12 md:max-h-14 object-contain opacity-90 transition-opacity duration-300 group-hover:opacity-100"
        />
      ) : (
        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center">
          <Building2 className="h-5 w-5 sm:h-6 sm:w-6 text-neutral-600 transition-colors duration-300 group-hover:text-[#05B1DE]/70" />
        </div>
      )}
    </div>

    {sponsor.type && (
      <div className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-y-0.5">
        <div className="rounded-md border border-[#05B1DE]/25 bg-[#020008]/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#05B1DE] shadow-[0_8px_24px_rgba(0,0,0,0.45)] backdrop-blur-sm eureka-mono">
          {sponsor.type}
        </div>
        <div className="mx-auto h-0 w-0 border-x-[5px] border-t-[5px] border-x-transparent border-t-[#05B1DE]/25" />
      </div>
    )}
  </motion.div>
);

const EurekaSponsors = () => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.28 }}
    className="mx-auto mt-10 sm:mt-14 md:mt-16 mb-8 w-full max-w-4xl px-2"
  >
    <div className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      {SPONSORS.map((sponsor, index) => (
        <SponsorLogo key={sponsor.id} sponsor={sponsor} index={index} />
      ))}
    </div>
  </motion.div>
);

export default EurekaSponsors;
