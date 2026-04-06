import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import TeamCard from '../components/TeamCard';
import Footer from '../components/Footer';

const Team = () => {
  const location = useLocation();
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const filter = searchParams.get('filter');
    if (filter) setActiveFilter(filter);
  }, [location.search]);

  const facultyCoordinators = [
    {
      name: 'Dr. Nishi Sharma',
      role: 'Faculty Coordinator',
      image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1760033447/1747474363758_srqubg.jpg',
      instagram: '',
      linkedin: 'https://www.linkedin.com/in/dr-nishi-sharma-8aab36159/',
      github: '',
    },
    {
      name: 'Dr. Ashima Shrivastava',
      role: 'Faculty Coordinator',
      image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1760033446/1655353630059_aovzf3.jpg',
      instagram: '',
      linkedin: 'https://www.linkedin.com/in/dr-ashima-srivastava-215295135/',
      github: '',
    },
  ];

  const teamData = [
    // ── 2nd Year ──
    { name: 'Sameer Singla', role: 'Joint Secretary', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1758553253/Sameer_singla_-min_tmbxss.jpg', department: 'Core Team', instagram: '', linkedin: 'https://linkedin.com/in/sameer-singla-1b7247348', github: 'https://github.com/alicoder123411', year: 2 },
    { name: 'Aditya Agarwal', role: 'General Secretary', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105138/Aditya_Agarwal_ezqijs.jpg', department: 'Core Team', instagram: 'https://instagram.com/aditya_agarwal_2024', linkedin: 'https://www.linkedin.com/in/aditya-agarwal-a6855534b', github: 'https://github.com/Aditya-ai204', year: 2 },
    { name: 'Utkarsh Srivastava', role: 'Technical Team Head', image: 'https://res.cloudinary.com/dpphtbawg/image/upload/v1770752268/utkarsh-srivastava_dh0rfz.jpg', department: 'Technical Team', instagram: 'https://www.instagram.com/utkarshsri1139/', linkedin: 'https://www.linkedin.com/in/utkarshsri1139/', github: 'https://github.com/UtkarshSrivastava1139', year: 2 },
    { name: 'Harsh Verma', role: 'Technical Team Member', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105138/1000010180_g496qx.jpg', department: 'Technical Team', instagram: 'https://www.instagram.com/_hrrsh/', linkedin: 'https://www.linkedin.com/in/harsh-verma-156234325/', github: 'https://github.com/hrshvv', year: 2 },
    { name: 'Ujjwal Kaushik', role: 'Technical Team Member', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105141/Ujjwal_Kaushik_qqlfwq.jpg', department: 'Technical Team', instagram: 'https://instagram.com/ujjwal_insane', linkedin: 'https://www.linkedin.com/in/kaushikujjwal/', github: 'https://github.com/Ujjwal-Qubit', year: 2 },
    { name: 'Sahal Parvez', role: 'Outreach Team Head', image: 'https://res.cloudinary.com/dpphtbawg/image/upload/v1770752688/sahal_profile_ljwo5g.png', department: 'Outreach Team', instagram: '', linkedin: '', github: '', year: 2 },
    { name: 'Kartikay Varshney', role: 'Design Team Head', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/v1758553718/kartikay-varshney_lyarqq.jpg', department: 'Design Team', instagram: 'https://instagram.com/krish.var', linkedin: 'https://www.linkedin.com/in/kartikey-varshney-23175133a', github: '', year: 2 },
    { name: 'Krish Chaudhary', role: 'Design Team Member', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1758477584/krish-ch_bjzl2n.jpg', department: 'Design Team', instagram: 'https://instagram.com/krisc.w', linkedin: 'https://www.linkedin.com/in/krish-choudhary-72a176317', github: '', year: 2 },
    { name: 'Daarim', role: 'Design Team Member', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105139/Daarim_wxbs4h.jpg', department: 'Design Team', instagram: 'https://instagram.com/daaarim_14', linkedin: 'https://www.linkedin.com/in/daarim/', github: 'https://github.com/Daarim1214', year: 2 },
    { name: 'Aryan Singh', role: 'Design Team Member', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/v1758552749/aryan-singh_katof2.jpg', department: 'Design Team', instagram: 'https://instagram.com/_aryan_gulia', linkedin: 'https://www.linkedin.com/in/aryan-singh-2a2a53385', github: '', year: 2 },
    { name: 'Kalyani Chaunwal', role: 'Content and Documentation Team Head', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105140/Kalyani_m8spfn.jpg', department: 'Content and Documentation Team', instagram: 'https://instagram.com/Itskalyanic', linkedin: 'https://www.linkedin.com/in/kalyani-chaunwal-a8801b273/', github: '', year: 2 },
    { name: 'Panna Tyagi', role: 'Liaisoning Team Head', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105140/20250514_121810_wrahh6.jpg', department: 'Liaisoning Team', instagram: 'https://instagram.com/panna.tyagii', linkedin: 'https://www.linkedin.com/in/panna-tyagi-a1263b29b', github: 'https://github.com/tyagipanna', year: 2 },
    { name: 'Daksh Goyal', role: 'Liaisoning Team Member', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1758477946/daksh-goyal_o3qfce.png', department: 'Liaisoning Team', instagram: 'https://instagram.com/daksh._.goyal7', linkedin: 'https://www.linkedin.com/in/daksh-goyal-334830324', github: '', year: 2 },
    { name: 'Parth Gahlot', role: 'Liaisoning Team Member', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/v1758921675/part-gahlot_rgotzo.jpg', department: 'Liaisoning Team', instagram: '', linkedin: '', github: '', year: 2 },
    { name: 'Luv Mangla', role: 'Marketing Team Head', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105141/LM_toe4zm.jpg', department: 'Marketing Team', instagram: '', linkedin: '', github: '', year: 2 },
    { name: 'Isha', role: 'Marketing Team Member', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105140/IMG_1323_gfjhut.jpg', department: 'Marketing Team', instagram: 'https://www.instagram.com/_i.sh_a_', linkedin: 'https://www.linkedin.com/in/isha-gupta-821873338', github: '', year: 2 },
    { name: 'Garvit Garg', role: 'Marketing Team Member', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1758478100/garvit-garg_hzyg7d.jpg', department: 'Marketing Team', instagram: '', linkedin: '', github: '', year: 2 },
    { name: 'Aaish Zaidi', role: 'Events and Training Team Head', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1758478100/aaish-zaidi_wsi1to.jpg', department: 'Events and Training Team', instagram: 'https://instagram.com/aaish_7_zaidi', linkedin: 'https://www.linkedin.com/in/aaish-abbas-zaidi-574082312', github: '', year: 2 },
    { name: 'Krish Bhardwaj', role: 'Events and Training Team Member', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1758563806/krish-bhardhwaj_xpfhce.jpg', department: 'Events and Training Team', instagram: '', linkedin: '', github: '', year: 2 },
    { name: 'Shashank Sahu', role: 'Events and Training Team Member', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105140/IMG_20241215_200355_826_lqudce.webp', department: 'Events and Training Team', instagram: 'https://instagram.com/i.m.shashank_01', linkedin: 'http://www.linkedin.com/in/shashank-sahu-985845312', github: 'https://github.com/Shashanksahu01', year: 2 },
    { name: 'Anushka Srivastava', role: 'Events and Training Team Member', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105138/Anushka_Srivastava_pdyof8.jpg', department: 'Events and Training Team', instagram: 'https://instagram.com/Anushka.a_28', linkedin: 'https://www.linkedin.com/in/anushka-ashish-213787373', github: '', year: 2 },
    { name: 'Lavanya Singh', role: 'Media and Networking Team Member', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105141/Lavanya_Singh_xv5dih.jpg', department: 'Media and Networking Team', instagram: 'https://instagram.com/Lavy.xoxo', linkedin: 'https://www.linkedin.com/in/lavanya-singh-490492330', github: '', year: 2 },
    { name: 'Ananya Mishra', role: 'Media and Networking Team', image: 'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757106502/Ananya_Mishra__ptthev.png', department: 'Media and Networking Team', instagram: 'https://instagram.com/mishraananya1976', linkedin: 'https://www.linkedin.com/in/ananya-mishra-6-', github: '', year: 2 },

    // ── 1st Year ──
    { name: 'Anshika Gupta', role: 'Technical Team Member', image: 'https://res.cloudinary.com/dumzfcdvx/image/upload/WhatsApp_Image_2026-03-21_at_23.25.24_setzup.jpg', department: 'Technical Team', instagram: 'https://instagram.com/anshikaa.inspace', linkedin: 'https://www.linkedin.com/in/anshika-gupta-0708bb31b', github: 'https://github.com/anshikagupta170706', year: 1 },
    { name: 'Purti Jain', role: 'Liaisoning Team Member', image: 'https://res.cloudinary.com/dumzfcdvx/image/upload/IMG_20260205_183739533_-_Purti_Jain_x2fepk', department: 'Liaisoning Team', instagram: '', linkedin: 'https://www.linkedin.com/in/purti-jain-91292337b', github: '', year: 1 },
    { name: 'Rishabh Kumar', role: 'Technical Team Member', image: 'https://res.cloudinary.com/dumzfcdvx/image/upload/RI_PHOTO_-_Rishabh_Kumar_mptace', department: 'Technical Team', instagram: '', linkedin: 'http://linkedin.com/in/rishabh-k-ab7596378', github: '', year: 1 },
    { name: 'Aayushi Pandey', role: 'Events and Training Team Member', image: 'https://res.cloudinary.com/dumzfcdvx/image/upload/WhatsApp_Image_2026-03-21_at_22.14.21_q6icc6', department: 'Events and Training Team', instagram: 'https://instagram.com/aayyushiii_01', linkedin: 'https://www.linkedin.com/in/aayushi-pandey-7251bb376', github: '', year: 1 },
    { name: 'Samiya Shaikh', role: 'Content and Documentation Team Member', image: 'https://res.cloudinary.com/dumzfcdvx/image/upload/IMG-20260208-WA0016_-_Samiya_shaikh_1_asylei', department: 'Content and Documentation Team', instagram: 'https://www.instagram.com/samiya.2607', linkedin: 'https://www.linkedin.com/in/samiya-shaikh-700275353', github: '', year: 1 },
    { name: 'Aditya Singh', role: 'Technical Team Member', image: 'https://res.cloudinary.com/dumzfcdvx/image/upload/IMG_20260201_134720_-_aditya_vhwhuy', department: 'Technical Team', instagram: 'https://instagram.com/Adi_t8749', linkedin: 'https://in.linkedin.com/in/aditya-singh-a95785278', github: 'https://github.com/ryzenforsales', year: 1 },
    { name: 'Navya Vishwakarma', role: 'Liaisoning Team Member', image: 'https://res.cloudinary.com/dumzfcdvx/image/upload/IMG_20260213_125318_-_Navya_Vishwakarma_iuc192', department: 'Liaisoning Team', instagram: 'https://instagram.com/_.navyaaaaa._12', linkedin: 'https://www.linkedin.com/in/navya-vishwakarma', github: 'https://github.com/navyavishwakarma', year: 1 },
    { name: 'Shivanshi Srivastava', role: 'Outreach Team Member', image: 'https://res.cloudinary.com/dumzfcdvx/image/upload/IMG-20250504-WA0053_2_-_Shivanshi_Srivastava_eldydn', department: 'Outreach Team', instagram: 'https://instagram.com/shivanshi_1507', linkedin: 'https://www.linkedin.com/in/shivanshi-srivastava07', github: 'https://github.com/shivanshis15', year: 1 },
    { name: 'Manshi Parmar', role: 'Outreach Team Member', image: 'https://res.cloudinary.com/dumzfcdvx/image/upload/IMG_20260213_132744_-_Manshi_k0rla6', department: 'Outreach Team', instagram: 'https://www.instagram.com/manshii.7', linkedin: 'https://www.linkedin.com/in/manshi-parmar-en', github: '', year: 1 },
    { name: 'Lakshita Rawat', role: 'Design Team Member', image: 'https://res.cloudinary.com/dumzfcdvx/image/upload/image_-_Lakshita_sev4kf', department: 'Design Team', instagram: '', linkedin: 'https://www.linkedin.com/in/lakshitarawat', github: 'https://github.com/lakshita-rawat', year: 1 },
    { name: 'Poorva Sanan', role: 'Design Team Member', image: 'https://res.cloudinary.com/dumzfcdvx/image/upload/e_contrast:level_-18;type_sigmoidal/WhatsApp_Image_2026-03-22_at_16.29.17_zvvdk9.jpg', department: 'Design Team', instagram: 'https://www.instagram.com/oyee_poorvaaa', linkedin: 'https://www.linkedin.com/in/poorva-sanan-b3098136b', github: '', year: 1 },
    { name: 'Samir', role: 'Events and Training Team Member', image: 'https://res.cloudinary.com/dumzfcdvx/image/upload/IMG_20260213_205015_-_SAMIR_nqdryb', department: 'Events and Training Team', instagram: 'https://instagram.com/samroy6010', linkedin: 'https://www.linkedin.com/in/samir-roy-896878320', github: '', year: 1 },
  ];

  const isLead = member => member.role.toLowerCase().includes('head');

  const getFilteredMembers = () => {
    if (activeFilter === 'All') return teamData;
    return teamData.filter(
      member =>
        member.department.trim().toLowerCase() ===
        activeFilter.trim().toLowerCase()
    );
  };

  const filteredTeam    = getFilteredMembers();
  const teamLeads       = filteredTeam.filter(m => m.year === 2 && isLead(m));
  const executiveMembers = filteredTeam.filter(m => m.year === 2 && !isLead(m));
  const associateMembers = filteredTeam.filter(m => m.year === 1);

  const showFacultyCoordinators =
    activeFilter === 'All' || activeFilter === 'Faculty Coordinators';

  const MemberSection = ({ title, members, badge, badgeColor }) => {
    if (members.length === 0) return null;
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-3 px-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 whitespace-nowrap">
            {title}
          </h3>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full whitespace-nowrap ${badgeColor}`}>
            {badge}
          </span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full px-2 sm:px-4 md:px-6 lg:px-8 justify-items-center">
          {members.map((member, index) => (
            <TeamCard
              key={`${title}-${index}`}
              name={member.name}
              role={member.role}
              image={member.image}
              instagram={member.instagram}
              linkedin={member.linkedin}
              github={member.github}
            />
          ))}
        </div>
      </div>
    );
  };

  const filters = [
    { label: 'All', value: 'All' },
    { label: 'Faculty Coordinators', value: 'Faculty Coordinators' },
    { label: 'Core Team', value: 'Core Team' },
    { label: 'Technical Team', value: 'Technical Team' },
    { label: 'Outreach Team', value: 'Outreach Team' },
    { label: 'Design Team', value: 'Design Team' },
    { label: 'Content & Docs', value: 'Content and Documentation Team' },
    { label: 'Liaisoning Team', value: 'Liaisoning Team' },
    { label: 'Events & Training', value: 'Events and Training Team' },
    { label: 'Marketing Team', value: 'Marketing Team' },
    { label: 'Media & Networking', value: 'Media and Networking Team' },
  ];

  return (
    <div className="space-y-4 pt-32 bg-white dark:bg-black min-h-screen">

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2 px-2 justify-center">
        {filters.map(({ label, value }) => (
          <Button
            key={value}
            variant={activeFilter === value ? 'default' : 'outline'}
            className={`text-xs px-2 py-1.5 h-auto min-h-[32px] flex items-center justify-center whitespace-nowrap transition-all duration-200 ${
              activeFilter === value
                ? 'bg-[#05B1DE] text-white hover:bg-[#05B1DE]/90'
                : 'hover:bg-[#05B1DE]/10'
            }`}
            onClick={() => setActiveFilter(value)}
          >
            {label}
          </Button>
        ))}
      </div>

      {/* Faculty Coordinators */}
      {showFacultyCoordinators && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white px-4">
            Faculty Coordinators
          </h2>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6 px-2 sm:px-4 md:px-6 lg:px-8 justify-items-center">
              {facultyCoordinators.map((member, index) => (
                <TeamCard
                  key={`faculty-${index}`}
                  name={member.name}
                  role={member.role}
                  image={member.image}
                  instagram={member.instagram}
                  linkedin={member.linkedin}
                  github={member.github}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Team Members — 3 sections */}
      {activeFilter !== 'Faculty Coordinators' && (
        <div className="space-y-10 pb-8">
          {activeFilter === 'All' && (
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white px-4">
              Team Members
            </h2>
          )}

          <MemberSection
            title="Team Leads"
            members={teamLeads}
            badge="2nd Year"
            badgeColor="bg-[#05B1DE]/15 text-[#05B1DE]"
          />
          <MemberSection
            title="Executive Members"
            members={executiveMembers}
            badge="2nd Year"
            badgeColor="bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
          />
          <MemberSection
            title="Associate Members"
            members={associateMembers}
            badge="1st Year"
            badgeColor="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Team;