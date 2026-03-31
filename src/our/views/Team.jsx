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
    if (filter) {
      setActiveFilter(filter);
    }
  }, [location.search]);

  // Faculty coordinators data
  const facultyCoordinators = [
    {
      name: 'Dr. Nishi Sharma',
      role: 'Faculty Coordinator',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1760033447/1747474363758_srqubg.jpg',
      instagram: '',
      linkedin: 'https://www.linkedin.com/in/dr-nishi-sharma-8aab36159/',
      github: '',
    },
    {
      name: 'Dr. Ashima Shrivastava',
      role: 'Faculty Coordinator',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1760033446/1655353630059_aovzf3.jpg',
      instagram: '',
      linkedin: 'https://www.linkedin.com/in/dr-ashima-srivastava-215295135/',
      github: '',
    },
  ];

  // Team data with department information
  const teamData = [
    //2ND YEAR
    {
      name: 'Sameer Singla',
      role: 'Joint Secretary',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1758553253/Sameer_singla_-min_tmbxss.jpg',
      department: 'Core Team',
      instagram: '',
      linkedin: 'https://linkedin.com/in/sameer-singla-1b7247348',
      github: 'https://github.com/alicoder123411',year: 2
    },
    {
      name: 'Aditya Agarwal',
      role: 'General Secretary',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105138/Aditya_Agarwal_ezqijs.jpg',
      department: 'Core Team',
      instagram: 'https://instagram.com/aditya_agarwal_2024',
      linkedin:
        'https://www.linkedin.com/in/aditya-agarwal-a6855534b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      github: 'https://github.com/Aditya-ai204',year: 2 
    },
    {
      name: 'Utkarsh Srivastava',
      role: 'Technical Team Head',
      image:
        'https://res.cloudinary.com/dpphtbawg/image/upload/v1770752268/utkarsh-srivastava_dh0rfz.jpg',
      department: 'Technical Team',
      instagram: 'https://www.instagram.com/utkarshsri1139/',
      linkedin: 'https://www.linkedin.com/in/utkarshsri1139/',
      github: 'https://github.com/UtkarshSrivastava1139',year: 2 
    },
    {
      name: 'Harsh Verma',
      role: 'Technical Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105138/1000010180_g496qx.jpg',
      department: 'Technical Team',
      instagram: 'https://www.instagram.com/_hrrsh/',
      linkedin: 'https://www.linkedin.com/in/harsh-verma-156234325/',
      github: 'https://github.com/hrshvv',year: 2 
    },
    {
      name: 'Ujjwal Kaushik',
      role: 'Technical Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105141/Ujjwal_Kaushik_qqlfwq.jpg',
      department: 'Technical Team',
      instagram: 'https://instagram.com/ujjwal_insane',
      linkedin: 'https://www.linkedin.com/in/kaushikujjwal/',
      github: 'https://github.com/Ujjwal-Qubit',year: 2 
    },
    {
      name: 'Sahal Parvez',
      role: 'Outreach Team Head',
      image:
        'https://res.cloudinary.com/dpphtbawg/image/upload/v1770752688/sahal_profile_ljwo5g.png',
      department: 'Outreach Team',
      instagram: '',
      linkedin: '',
      github: '',year: 2 
    },
    {
      name: 'Kartikay Varshney',
      role: 'Design Team Head',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1758553718/kartikay-varshney_lyarqq.jpg',
      department: 'Design Team',
      instagram: 'https://instagram.com/krish.var',
      linkedin: 'https://www.linkedin.com/in/kartikey-varshney-23175133a',
      github: '',year: 2 
    },
    {
      name: 'Krish Chaudhary',
      role: 'Design Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1758477584/krish-ch_bjzl2n.jpg',
      department: 'Design Team',
      instagram: 'https://instagram.com/krisc.w',
      linkedin: 'https://www.linkedin.com/in/krish-choudhary-72a176317',
      github: '',year: 2 
    },
    {
      name: 'Daarim',
      role: 'Design Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105139/Daarim_wxbs4h.jpg',
      department: 'Design Team',
      instagram: 'https://instagram.com/daaarim_14',
      linkedin: 'https://www.linkedin.com/in/daarim/',
      github: 'https://github.com/Daarim1214',year: 2 
    },
    {
      name: 'Aryan Singh',
      role: 'Design Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1758552749/aryan-singh_katof2.jpg',
      department: 'Design Team',
      instagram: 'https://instagram.com/_aryan_gulia ',
      linkedin:
        'https://www.linkedin.com/in/aryan-singh-2a2a53385?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      github: '',year: 2 
    },
    {
      name: 'Kalyani Chaunwal',
      role: 'Content and Documentation Team Head',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105140/Kalyani_m8spfn.jpg',
      department: 'Content and Documentation Team',
      instagram: 'https://instagram.com/Itskalyanic',
      linkedin: 'https://www.linkedin.com/in/kalyani-chaunwal-a8801b273/',
      github: '',year: 2 
    },
    {
      name: 'Panna Tyagi',
      role: 'Liaisoning Team Head',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105140/20250514_121810_wrahh6.jpg',
      department: 'Liaisoning Team',
      instagram: 'https://instagram.com/panna.tyagii',
      linkedin:
        'https://www.linkedin.com/in/panna-tyagi-a1263b29b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      github: 'https://github.com/tyagipanna',year: 2 
    },
    {
      name: 'Daksh Goyal',
      role: 'Liaisoning Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1758477946/daksh-goyal_o3qfce.png',
      department: 'Liaisoning Team',
      instagram: 'https://instagram.com/daksh._.goyal7',
      linkedin:
        'https://www.linkedin.com/in/daksh-goyal-334830324?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      github: '',year: 2 
    },
    {
      name: 'Parth Gahlot',
      role: 'Liaisoning Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1758921675/part-gahlot_rgotzo.jpg',
      department: 'Liaisoning Team',
      instagram: '',
      linkedin: '',
      github: '',year: 2 
    },
    {
      name: 'Luv Mangla',
      role: 'Marketing Team Head',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105141/LM_toe4zm.jpg',
      department: 'Marketing Team',
      instagram: '',
      linkedin: '',
      github: '',year: 2 
    },
    {
      name: 'Isha',
      role: 'Marketing Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105140/IMG_1323_gfjhut.jpg',
      department: 'Marketing Team',
      instagram:
        'https://www.instagram.com/_i.sh_a_?igsh=MWtmdnBvaGMwbzd1Nw%3D%3D&utm_source=qr',
      linkedin:
        'https://www.linkedin.com/in/isha-gupta-821873338?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      github: '',year: 2 
    },
    {
      name: 'Garvit Garg',
      role: 'Marketing Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1758478100/garvit-garg_hzyg7d.jpg',
      department: 'Marketing Team',
      instagram: '',
      linkedin: '',
      github: '',year: 2 
    },
    {
      name: 'Aaish Zaidi',
      role: 'Events and Training Team Head',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1758478100/aaish-zaidi_wsi1to.jpg',
      department: 'Events and Training Team',
      instagram: 'https://instagram.com/aaish_7_zaidi',
      linkedin:
        'https://www.linkedin.com/in/aaish-abbas-zaidi-574082312?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      github: '',year: 2 
    },
    {
      name: 'Krish Bhardwaj',
      role: 'Events and Training Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1758563806/krish-bhardhwaj_xpfhce.jpg',
      department: 'Events and Training Team',
      instagram: '',
      linkedin: '',
      github: '',year: 2 
    },
    {
      name: 'Shashank Sahu',
      role: 'Events and Training Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105140/IMG_20241215_200355_826_lqudce.webp',
      department: 'Events and Training Team',
      instagram: 'https://instagram.com/i.m.shashank_01',
      linkedin: 'http://www.linkedin.com/in/shashank-sahu-985845312',
      github: 'https://github.com/Shashanksahu01',year: 2 
    },
    {
      name: 'Anushka Srivastava',
      role: 'Events and Training Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105138/Anushka_Srivastava_pdyof8.jpg',
      department: 'Events and Training Team',
      instagram: 'https://instagram.com/Anushka.a_28',
      linkedin:
        'https://www.linkedin.com/in/anushka-ashish-213787373?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      github: '',year: 2 
    },
    {
      name: 'Lavanya Singh',
      role: 'Media and Networking Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105141/Lavanya_Singh_xv5dih.jpg',
      department: 'Media and Networking Team',
      instagram: 'https://instagram.com/Lavy.xoxo',
      linkedin:
        'https://www.linkedin.com/in/lavanya-singh-490492330?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      github: '',year: 2 
    },
    {
      name: 'Ananya Mishra',
      role: 'Media and Networking Team',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757106502/Ananya_Mishra__ptthev.png',
      department: 'Media and Networking Team',
      instagram: 'https://instagram.com/mishraananya1976 ',
      linkedin:
        'https://www.linkedin.com/in/ananya-mishra-6-?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      github: '',year: 2 
    },

    //1ST YEAR
    {
      name: 'Alabhya Mehrotra',
      role: 'Design Team Member',
      image:
        'https://res.cloudinary.com/dumzfcdvx/image/upload/IMG-20260217-WA0016_-_Alabhya_Mehrotra_uqd1hi',
      department: 'Design Team',
      instagram: ' ',
      linkedin:
        'https://www.linkedin.com/in/alabhya-mehrotra-5525a4370',
      github: '',year: 1
    },
    {
      name: 'Shriti Gupta',
      role: 'Content and Documentation Team Member',
      image:
        'https://res.cloudinary.com/dumzfcdvx/image/upload/Imagine_18050424389604601_-_Shriti_Gupta_zns5pf',
      department: 'Content and Documentation Team',
      instagram: 'https://www.instagram.com/shritigupta__07/ ',
      linkedin:
        'https://www.linkedin.com/in/shriti-gupta-40a0a9372/',
      github: 'https://github.com/shritigupta007-alt',year: 1
    },
    {
      name: 'Aveeshi Kapil ',
      role: 'Marketing Team Member',
      image:
        'https://res.cloudinary.com/dumzfcdvx/image/upload/IMG-20251204-WA0116_1_-_Aveeshi_Kapil_jgczvo',
      department: 'Marketing Team',
      instagram: '',
      linkedin:
        'https://www.linkedin.com/in/aveeshi-k-a9519a370/',
      github: 'https://github.com/vizzie97',year: 1
    },
    {
      name: 'Shree Vatsa Pandey ',
      role: 'Marketing Team Member',
      image:
        'https://res.cloudinary.com/dumzfcdvx/image/upload/IMG-20250914-WA0002_1_-_SHREE_gknqvz',
      department: 'Marketing Team',
      instagram: '',
      linkedin:
        '',
      github: '',year: 1
    },
    {
      name: 'Shubham Verma',
      role: 'Technical Team Member',
      image:
        'https://res.cloudinary.com/dumzfcdvx/image/upload/IMG_7963_-_Shubham_Verma_tgtz8o',
      department: 'Technical Team',
      instagram: '',
      linkedin:
        'https://www.linkedin.com/in/its-me-shubham-verma?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      github: 'https://github.com/shubhamverma-devx',year: 1
    },
    {
      name: 'Harshpreet  kaur ',
      role: 'Liasoning Team Member',
      image:
        'https://res.cloudinary.com/dumzfcdvx/image/upload/IMG-20250913-WA0135_-_Harshpreet_Kaur_reom6d',
      department: 'Liasoning Team',
      instagram: '',
      linkedin:
        'https://www.linkedin.com/in/harshpreet-kaur-480889375?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      github: '',year: 1
    },
    {
      name: 'Mritunjay tiwari',
      role: 'Social Media Team Member',
      image:
        'https://res.cloudinary.com/dumzfcdvx/image/upload/IMG_5842_-_Nihal_Tiwari_lcntgi',
      department: 'Social Media Team',
      instagram: '',
      linkedin:
        'https://www.linkedin.com/in/mrityunjay-tiwari-6a8914399?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
      github: '',year: 1
    },
    {
      name: 'Varuni Kalra ',
      role: 'Liasoning Team Member',
      image:
        'https://res.cloudinary.com/dumzfcdvx/image/upload/20251206_140218_-_Varuni_Kalra_jerfh4',
      department: 'Liasoning Team',
      instagram: '',
      linkedin:
        'https://www.linkedin.com/in/varuni-kalra-721146379?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      github: '',year: 1
    },
    {
      name: 'Anvita Sameer',
      role: 'Design Team Member',
      image:
        'https://res.cloudinary.com/dumzfcdvx/image/upload/f_auto,c_auto,h_600,w_600/Anvita-_EDC_pic_-_Anvita_qkiwk6.heic',
      department: 'Design Team',
      instagram: '',
      linkedin:
        'https://www.linkedin.com/in/anvita-sameer-48b2a3386/',
      github: '',year: 1
    },
    {
      name: 'Janvee Sagar',
      role: 'Design Team Member',
      image:
        'https://res.cloudinary.com/dumzfcdvx/image/upload/Untitled_design_20260214_232116_0000_-_Janvee_Sagar_urnylk',
      department: 'Design Team',
      instagram: 'https://www.instagram.com/thejanvee.sagarr?igsh=Mzh4aTdyOGRzcnBp',
      linkedin:
        'https://www.linkedin.com/in/janvee-sagar-4818b1378?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      github: 'https://github.com/janvee-core03',year: 1
    },
    {
      name: 'Tanushi Sharma ',
      role: 'Content and Documentation Team Member',
      image:
        'https://res.cloudinary.com/dumzfcdvx/image/upload/Screenshot_2026-02-14-23-09-35-86_6012fa4d4ddec268fc5c7112cbb265e7_-_Tanushi_Sharma_ruz3v5',
      department: 'Content and Documentation Team',
      instagram: '',
      linkedin:
        '',
      github: '',year: 1
    },
    {
      name: 'Bhargav Wariyal ',
      role: 'Content and Documentation Team Member',
      image:
        'https://res.cloudinary.com/dumzfcdvx/image/upload/17710879106835359238193069224458_-_Bhargav_Wariyal_xasyh4',
      department: 'Content and Documentation Team',
      instagram: '',
      linkedin:
        'https://www.linkedin.com/in/bhargav-wariyal-609a4834b?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      github: '',year: 1
    },
    {
      name: 'Rounak Sheera',
      role: 'Social Media Team Member',
      image:
        'https://res.cloudinary.com/dumzfcdvx/image/upload/IMG_20260206_174906_-_rounak_sheera_nbe5az',
      department: 'Social Media Team',
      instagram: '',
      linkedin:
        'https://www.linkedin.com/in/rounak-sheera-b96ba337a?utm_source=share_via&utm_content=profile&utm_medium=member_android',
      github: '',year: 1
    },
    {
      name: 'Arshita Soni',
      role: 'Social Media Team Member',
      image:
        'https://res.cloudinary.com/dumzfcdvx/image/upload/a72dd94d-d44c-46c4-af6a-660efbfc071a_-_Arshita_Soni_avtyne',
      department: 'Social Media Team',
      instagram: 'https://www.instagram.com/_ar.shitaa?igsh=MW05N253cnNxMjBvaA%3D%3D&utm_source=qr',
      linkedin:
        'https://www.linkedin.com/in/arshita-soni-083896380?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      github: 'https://share.google/qUZNBl9JCQIHU8VdC',year: 1
    },
    {
      name: 'Khushi pandey ',
      role: 'Outreach Team Member',
      image:
        'https://res.cloudinary.com/dumzfcdvx/image/upload/IMG_20250722_165850_752_-_Khushi_Pandey_hlsyks',
      department: 'Outreach Team',
      instagram: 'https://www.instagram.com/def_not_haaapppyyyy?igsh=MXRieXY3Z3Jna2xybw==',
      linkedin:
        'https://www.linkedin.com/in/khushipandey04?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app',
      github: '',year: 1
    },
    {
      name: 'Yovika Arora',
      role: 'Liaisoning Team Member',
      image:
        'https://res.cloudinary.com/dumzfcdvx/image/upload/IMG_3757_-_Yovika_Arora_xucsxi',
      department: 'Liaisoning Team',
      instagram: '',
      linkedin:
        'https://www.linkedin.com/in/yovika-arora-a461a638b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
      github: '',year: 1
    },
    {
      name: 'Raghavi Shivhare',
      role: 'Marketing Team Member',
      image:
        'https://res.cloudinary.com/dumzfcdvx/image/upload/IMG_6852_-_RAGHAVI_SHIVHARE_brezyx',
      department: 'Marketing Team',
      instagram: '',
      linkedin:
        'https://www.linkedin.com/in/raghavi-shivhare-93693b364?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
      github: 'https://github.com/raghavishivhare-jpg',year: 1
    },
    {
      name: 'Vaishnavi Negi',
      role: 'Technical Team Member',
      image:
        'https://res.cloudinary.com/dumzfcdvx/image/upload/e_contrast:level_-18;type_sigmoidal/WhatsApp_Image_2026-03-22_at_16.31.09_ncagay.jpg',
      department: 'Technical Team',
      instagram: 'https://www.instagram.com/__negii23__?igsh=OWtoamt0Znp6cnEw',
      linkedin:
        'https://www.linkedin.com/in/vaishnavinegii',
      github: 'https://github.com/negiigit',year: 1
    },
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
