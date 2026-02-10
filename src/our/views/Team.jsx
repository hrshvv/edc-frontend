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
    {
      name: 'Sameer Singla',
      role: 'Joint Secretary',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1758553253/Sameer_singla_-min_tmbxss.jpg',
      department: 'Core Team',
      instagram: '',
      linkedin: 'https://linkedin.com/in/sameer-singla-1b7247348',
      github: 'https://github.com/alicoder123411',
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
      github: 'https://github.com/Aditya-ai204',
    },
    {
      name: 'Utkarsh Srivastava',
      role: 'Technical Team Head',
      image:
        'https://res.cloudinary.com/dpphtbawg/image/upload/v1770752268/utkarsh-srivastava_dh0rfz.jpg',
      department: 'Technical Team',
      instagram: 'https://www.instagram.com/utkarshsri1139/',
      linkedin: 'https://www.linkedin.com/in/utkarshsri1139/',
      github: 'https://github.com/UtkarshSrivastava1139',
    },
    {
      name: 'Harsh Verma',
      role: 'Technical Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105138/1000010180_g496qx.jpg',
      department: 'Technical Team',
      instagram: 'https://www.instagram.com/_hrrsh/',
      linkedin: 'https://www.linkedin.com/in/harsh-verma-156234325/',
      github: 'https://github.com/hrshvv',
    },
    {
      name: 'Ujjwal Kaushik',
      role: 'Technical Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105141/Ujjwal_Kaushik_qqlfwq.jpg',
      department: 'Technical Team',
      instagram: 'https://instagram.com/ujjwal_insane',
      linkedin: 'https://www.linkedin.com/in/kaushikujjwal/',
      github: 'https://github.com/Ujjwal-Qubit',
    },
    {
      name: 'Sahal Parvez',
      role: 'Outreach Team Head',
      image:
        'https://res.cloudinary.com/dpphtbawg/image/upload/v1770752688/sahal_profile_ljwo5g.png',
      department: 'Outreach Team',
      instagram: '',
      linkedin: '',
      github: '',
    },
    {
      name: 'Kartikay Varshney',
      role: 'Design Team Head',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1758553718/kartikay-varshney_lyarqq.jpg',
      department: 'Design Team',
      instagram: 'https://instagram.com/krish.var',
      linkedin: 'https://www.linkedin.com/in/kartikey-varshney-23175133a',
      github: '',
    },
    {
      name: 'Krish Chaudhary',
      role: 'Design Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1758477584/krish-ch_bjzl2n.jpg',
      department: 'Design Team',
      instagram: 'https://instagram.com/krisc.w',
      linkedin: 'https://www.linkedin.com/in/krish-choudhary-72a176317',
      github: '',
    },
    {
      name: 'Daarim',
      role: 'Design Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105139/Daarim_wxbs4h.jpg',
      department: 'Design Team',
      instagram: 'https://instagram.com/daaarim_14',
      linkedin: 'https://www.linkedin.com/in/daarim/',
      github: 'https://github.com/Daarim1214',
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
      github: '',
    },
    {
      name: 'Kalyani Chaunwal',
      role: 'Content and Documentation Team Head',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105140/Kalyani_m8spfn.jpg',
      department: 'Content and Documentation Team',
      instagram: 'https://instagram.com/Itskalyanic',
      linkedin: 'https://www.linkedin.com/in/kalyani-chaunwal-a8801b273/',
      github: '',
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
      github: 'https://github.com/tyagipanna',
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
      github: '',
    },
    {
      name: 'Parth Gahlot',
      role: 'Liaisoning Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1758921675/part-gahlot_rgotzo.jpg',
      department: 'Liaisoning Team',
      instagram: '',
      linkedin: '',
      github: '',
    },
    {
      name: 'Luv Mangla',
      role: 'Marketing Team Head',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105141/LM_toe4zm.jpg',
      department: 'Marketing Team',
      instagram: '',
      linkedin: '',
      github: '',
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
      github: '',
    },
    {
      name: 'Garvit Garg',
      role: 'Marketing Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1758478100/garvit-garg_hzyg7d.jpg',
      department: 'Marketing Team',
      instagram: '',
      linkedin: '',
      github: '',
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
      github: '',
    },
    {
      name: 'Krish Bhardwaj',
      role: 'Events and Training Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1758563806/krish-bhardhwaj_xpfhce.jpg',
      department: 'Events and Training Team',
      instagram: '',
      linkedin: '',
      github: '',
    },
    {
      name: 'Shashank Sahu',
      role: 'Events and Training Team Member',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/ar_4:5,c_fill,g_face/v1757105140/IMG_20241215_200355_826_lqudce.webp',
      department: 'Events and Training Team',
      instagram: 'https://instagram.com/i.m.shashank_01',
      linkedin: 'http://www.linkedin.com/in/shashank-sahu-985845312',
      github: 'https://github.com/Shashanksahu01',
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
      github: '',
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
      github: '',
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
      github: '',
    },
  ];

  // Filter team members based on active filter
  const filteredTeam =
    activeFilter === 'All'
      ? teamData
      : teamData.filter(member => member.department === activeFilter);

  // Show faculty coordinators based on filter
  const showFacultyCoordinators =
    activeFilter === 'All' || activeFilter === 'Faculty Coordinators';

  return (
    <div className="space-y-4 pt-32 bg-white dark:bg-black min-h-screen">
      <div className="flex flex-wrap gap-2 px-2 justify-center">
        <Button
          variant={activeFilter === 'All' ? 'default' : 'outline'}
          className={`text-xs px-2 py-1.5 h-auto min-h-[32px] flex items-center justify-center whitespace-nowrap transition-all duration-200 ${
            activeFilter === 'All'
              ? 'bg-[#05B1DE] text-white hover:bg-[#05B1DE]/90'
              : 'hover:bg-[#05B1DE]/10'
          }`}
          onClick={() => setActiveFilter('All')}
        >
          All
        </Button>
        <Button
          variant={
            activeFilter === 'Faculty Coordinators' ? 'default' : 'outline'
          }
          className={`text-xs px-2 py-1.5 h-auto min-h-[32px] flex items-center justify-center whitespace-nowrap transition-all duration-200 ${
            activeFilter === 'Faculty Coordinators'
              ? 'bg-[#05B1DE] text-white hover:bg-[#05B1DE]/90'
              : 'hover:bg-[#05B1DE]/10'
          }`}
          onClick={() => setActiveFilter('Faculty Coordinators')}
        >
          Faculty Coordinators
        </Button>
        <Button
          variant={activeFilter === 'Core Team' ? 'default' : 'outline'}
          className={`text-xs px-2 py-1.5 h-auto min-h-[32px] flex items-center justify-center whitespace-nowrap transition-all duration-200 ${
            activeFilter === 'Core Team'
              ? 'bg-[#05B1DE] text-white hover:bg-[#05B1DE]/90'
              : 'hover:bg-[#05B1DE]/10'
          }`}
          onClick={() => setActiveFilter('Core Team')}
        >
          Core Team
        </Button>
        <Button
          variant={activeFilter === 'Technical Team' ? 'default' : 'outline'}
          className={`text-xs px-2 py-1.5 h-auto min-h-[32px] flex items-center justify-center whitespace-nowrap transition-all duration-200 ${
            activeFilter === 'Technical Team'
              ? 'bg-[#05B1DE] text-white hover:bg-[#05B1DE]/90'
              : 'hover:bg-[#05B1DE]/10'
          }`}
          onClick={() => setActiveFilter('Technical Team')}
        >
          Technical Team
        </Button>
        <Button
          variant={activeFilter === 'Outreach Team' ? 'default' : 'outline'}
          className={`text-xs px-2 py-1.5 h-auto min-h-[32px] flex items-center justify-center whitespace-nowrap transition-all duration-200 ${
            activeFilter === 'Outreach Team'
              ? 'bg-[#05B1DE] text-white hover:bg-[#05B1DE]/90'
              : 'hover:bg-[#05B1DE]/10'
          }`}
          onClick={() => setActiveFilter('Outreach Team')}
        >
          Outreach Team
        </Button>
        <Button
          variant={activeFilter === 'Design Team' ? 'default' : 'outline'}
          className={`text-xs px-2 py-1.5 h-auto min-h-[32px] flex items-center justify-center whitespace-nowrap transition-all duration-200 ${
            activeFilter === 'Design Team'
              ? 'bg-[#05B1DE] text-white hover:bg-[#05B1DE]/90'
              : 'hover:bg-[#05B1DE]/10'
          }`}
          onClick={() => setActiveFilter('Design Team')}
        >
          Design Team
        </Button>
        <Button
          variant={
            activeFilter === 'Content and Documentation Team'
              ? 'default'
              : 'outline'
          }
          className={`text-xs px-2 py-1.5 h-auto min-h-[32px] flex items-center justify-center whitespace-nowrap transition-all duration-200 ${
            activeFilter === 'Content and Documentation Team'
              ? 'bg-[#05B1DE] text-white hover:bg-[#05B1DE]/90'
              : 'hover:bg-[#05B1DE]/10'
          }`}
          onClick={() => setActiveFilter('Content and Documentation Team')}
        >
          Content & Docs
        </Button>
        <Button
          variant={activeFilter === 'Liaisoning Team' ? 'default' : 'outline'}
          className={`text-xs px-2 py-1.5 h-auto min-h-[32px] flex items-center justify-center whitespace-nowrap transition-all duration-200 ${
            activeFilter === 'Liaisoning Team'
              ? 'bg-[#05B1DE] text-white hover:bg-[#05B1DE]/90'
              : 'hover:bg-[#05B1DE]/10'
          }`}
          onClick={() => setActiveFilter('Liaisoning Team')}
        >
          Liaisoning Team
        </Button>
        <Button
          variant={
            activeFilter === 'Events and Training Team' ? 'default' : 'outline'
          }
          className={`text-xs px-2 py-1.5 h-auto min-h-[32px] flex items-center justify-center whitespace-nowrap transition-all duration-200 ${
            activeFilter === 'Events and Training Team'
              ? 'bg-[#05B1DE] text-white hover:bg-[#05B1DE]/90'
              : 'hover:bg-[#05B1DE]/10'
          }`}
          onClick={() => setActiveFilter('Events and Training Team')}
        >
          Events & Training
        </Button>
        <Button
          variant={activeFilter === 'Marketing Team' ? 'default' : 'outline'}
          className={`text-xs px-2 py-1.5 h-auto min-h-[32px] flex items-center justify-center whitespace-nowrap transition-all duration-200 ${
            activeFilter === 'Marketing Team'
              ? 'bg-[#05B1DE] text-white hover:bg-[#05B1DE]/90'
              : 'hover:bg-[#05B1DE]/10'
          }`}
          onClick={() => setActiveFilter('Marketing Team')}
        >
          Marketing Team
        </Button>
        <Button
          variant={
            activeFilter === 'Media and Networking Team' ? 'default' : 'outline'
          }
          className={`text-xs px-2 py-1.5 h-auto min-h-[32px] flex items-center justify-center whitespace-nowrap transition-all duration-200 ${
            activeFilter === 'Media and Networking Team'
              ? 'bg-[#05B1DE] text-white hover:bg-[#05B1DE]/90'
              : 'hover:bg-[#05B1DE]/10'
          }`}
          onClick={() => setActiveFilter('Media and Networking Team')}
        >
          Media & Networking
        </Button>
      </div>

      {/* Faculty Coordinators Section */}
      {showFacultyCoordinators && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white px-4">
            Faculty Coordinators
          </h2>
          <div className="flex justify-center">
            <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 px-2 sm:px-4 md:px-6 lg:px-8 justify-items-center">
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

      {/* Team Members Section */}
      {activeFilter !== 'Faculty Coordinators' && (
        <div className="space-y-4">
          {activeFilter === 'All' && (
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white px-4">
              Team Members
            </h2>
          )}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full px-2 sm:px-4 md:px-6 lg:px-8 justify-items-center">
            {filteredTeam.map((member, index) => (
              <TeamCard
                key={`team-${index}`}
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
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Team;
