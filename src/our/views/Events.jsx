import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import PixelCard from '../../components/PixelCard';
import { InfiniteMovingCards } from '../../components/ui/infinite-moving-cards';

const Events = () => {
  // Event gallery images for each event
  const event1Gallery = [
    {
      id: 1,
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1759387732/IMG_5645_nibiiw.jpg',
    },
    {
      id: 2,
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1759387730/IMG_5637_k7kyxu.jpg',
    },
    {
      id: 3,
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1759387729/IMG_4329_ro2uaf.jpg',
    },
    {
      id: 4,
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1759387727/IMG_4289_zezr74.jpg',
    },
    {
      id: 5,
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1759387727/IMG_4300_yxfszd.jpg',
    },
  ];

  const event2Gallery = [
    {
      id: 1,
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1759396434/20250805_145633_etlf36.jpg',
    },
    {
      id: 2,
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1759396434/20250805_143104_plm2v0.jpg',
    },
    {
      id: 3,
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1759396434/20250805_142633_fkc2dh.jpg',
    },
    {
      id: 4,
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1758992936/WhatsApp_Image_2025-09-27_at_20.01.31_04f0779d_jwq8kg.png',
    },
  ];

  const event4Gallery = [
    {
      id: 1,
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1765715252/1000028361_ozaax3.jpg',
    },
    {
      id: 2,
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1765715252/_storage_emulated_0_DCIM_Camera_IMG_20251103_143212_jtlivr.jpg',
    },
    {
      id: 3,
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1765715251/IMG_20251103_144121_hpblfo.jpg',
    },
    // Add more images here
  ];

  const event5Gallery = [
    {
      id: 1,
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1765716082/DSC_0267_1_wdba99.jpg',
    },
    {
      id: 2,
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1765716088/DSC_0259_1_daky5n.jpg',
    },
    {
      id: 3,
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1765716094/DSC_0269_1_s1aqyd.jpg',
    },
    {
      id: 4,
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1765716262/DSC_0256_2_r7ydrv.jpg',
    },
    // Add more images here
  ];

  // Past events with detailed information
  const pastEvents = [
    {
      id: 5,
      title: 'LinkedIn Workshop',
      description:
        'The LinkedIn Workshop was an interactive session aimed at helping first-year students build a strong and professional digital presence. The workshop focused on optimizing LinkedIn profiles, understanding personal branding, and using the platform effectively for networking and career growth. Students learned how to showcase their skills, experiences, and achievements in a way that attracts recruiters and opportunities. Overall, the session provided practical guidance to confidently step into the professional world with a well-crafted LinkedIn profile.',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1765714638/Screenshot_2025-12-14_174705_rcvjzy.png',
      date: '2025-11-19',
      location: 'AB-3 Room-501',
      attendees: '50+',
      category: 'Event',
      highlights: [
        'LinkedIn profile building basics',
        'Personal branding tips',
        'Creating a strong digital presence',
        'Career-focused networking skills',
      ],
    },
    {
      id: 4,
      title: 'Expext Talk',
      description:
        "The Expert Talk on Stock Market, Finance, and Investing was an insightful session designed to help students understand the basics of investing and navigate the volatility of financial markets with confidence. The speaker shared practical knowledge on how the stock market works, explained key financial concepts in a simple way, and discussed effective strategies for making informed investment decisions. The session focused on developing a disciplined mindset, managing risks, and understanding market trends, making it especially useful for beginners who want to start their investing journey. Overall, the talk empowered students with financial awareness and a clearer perspective on smart investing in today's dynamic market.",
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1765714147/Screenshot_2025-12-14_173753_fgjulh.png',
      date: '2025-11-03',
      location: 'AB-3 Room-113',
      attendees: '50+',
      category: 'Networking',
      highlights: [
        'Basics of stock market and investing',
        'Understanding market ups and downs',
        'Smart investing tips for beginners',
        'Long-term wealth mindset',
      ],
    },
    {
      id: 1,
      title: 'EDCxEureka! Road to Enterprise 2025',
      description:
        'Eureka! Road to Enterprise 2025, organized under the National Entrepreneurship Challenge 2025 by E-Cell IIT Bombay, was successfully conducted at JSS University, Noida. The event served as a dynamic platform for aspiring innovators and entrepreneurs to pitch their ideas, gain mentorship, and take the first step toward building impactful startups. It inspired participants to think big, step up, and make their ideas heard.',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1759080883/WhatsApp_Image_2025-09-28_at_22.00.24_4f14c6fe_sazknc.jpg',
      date: '2025-08-20',
      location: 'AB-3 Room-113',
      attendees: '80+',
      winner: '🥇 Team Legoal <br/>🥈 Team Cronoz <br/>🥉 Team Zenminds',
      category: 'Competition',
      highlights: [
        'Students pitched their innovative startup ideas.',
        'Interactive discussions on entrepreneurship and innovation.',
        'Collaboration with E-Cell IIT Bombay under NEC 2025.',
        'Top ideas received recognition and valuable feedback.',
      ],
    },
    {
      id: 2,
      title: 'Orientation Programme 2025',
      description:
        'The EDC Orientation Programme marked the beginning of a new entrepreneurial journey for the students of JSS University, Noida. The session introduced freshers to the vision, initiatives, and opportunities provided by the Entrepreneurship Development Cell (EDC), inspiring them to take their first step into the world of startups and innovation.',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1759080882/WhatsApp_Image_2025-09-28_at_22.01.37_a5399f7c_w0jn1f.jpg',
      date: '2025-08-05',
      location: 'MPH',
      attendees: '150+',
      winner: null,
      category: 'Networking',
      highlights: [
        "Introduction to EDC's vision, mission, and yearly activities.",
        'Inspiring talks encouraging students to explore entrepreneurship.',
        'Interaction between new members and the EDC core team.',
        'Conducted on 5th August 2025 at 2 PM in MPH',
      ],
    },
    {
      id: 3,
      title: 'Group Discussion',
      description:
        'The Group Discussion organized by EDC JSSUNI under the National Entrepreneurship Challenge 2025 provided a platform for students to express their views on Entrepreneurship Problems on Campus. It encouraged open dialogue, critical thinking, and teamwork among participants while promoting entrepreneurial awareness within the university.',
      image:
        'https://res.cloudinary.com/dh8cqlngr/image/upload/v1759080881/EDC_JSS_UNI_nviwol.png',
      date: '2025-09-14',
      location: 'Online',
      attendees: 10,
      winner: null,
      category: 'Networking',
      highlights: [
        'Insightful discussion on challenges faced by student entrepreneurs.',
        'Active participation from students across different departments.',
        'Conducted online on 14th September 2025 at 9:00 PM.',
        'Top participants received appreciation for their valuable inputs',
      ],
    },
  ];

  // Format date for display
  const formatDate = dateString => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const location = useLocation();

  // Scroll to specific event when hash is present in URL
  useEffect(() => {
    if (location.hash) {
      const eventId = location.hash.replace('#event-', '');
      const eventElement = document.getElementById(`event-${eventId}`);
      if (eventElement) {
        // Delay to ensure page is rendered and ScrollToTop has finished
        setTimeout(() => {
          const offset = 100; // Offset for navbar
          const elementPosition = eventElement.offsetTop - offset;
          window.scrollTo({
            top: elementPosition,
            behavior: 'smooth',
          });
          // Add a highlight effect
          eventElement.style.transition = 'box-shadow 0.3s ease';
          eventElement.style.boxShadow = '0 0 30px rgba(5, 177, 222, 0.5)';
          setTimeout(() => {
            eventElement.style.boxShadow = '';
          }, 2000);
        }, 300);
      }
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-16 sm:pt-20">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-10 text-center relative">
        <h1 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 md:mb-8">
          Our <span className="text-[#05B1DE] dark:text-[#05B1DE]">Events</span>
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 sm:mb-10 md:mb-12 px-2">
          Join us for exciting workshops, competitions, and networking events
          designed to fuel your entrepreneurial journey
        </p>
      </div>

      {/* Hero to Events Barrier */}
      <div className="py-6 sm:py-8 flex justify-center">
        <div className="relative group">
          {/* Main gradient line with glow effect */}
          <div className="w-64 sm:w-80 md:w-96 lg:w-300 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>

          {/* Center diamond with gradient */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 bg-[#05B1DE] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
          </div>

          {/* Decorative dots */}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-x-6 sm:-translate-x-8 w-1 h-1 bg-blue-400 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 translate-x-6 sm:translate-x-8 w-1 h-1 bg-purple-400 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>

          {/* Subtle glow effect */}
          <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 w-10 sm:w-12 h-6 sm:h-8 bg-[#05B1DE]/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>

      {/* Events Section */}
      <div className="py-8 sm:py-12 md:py-16 bg-black">
        <div className="container mx-auto px-4">
          {/* Past Events Grid */}
          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {pastEvents.map((event, index) => (
              <div key={event.id} id={`event-${event.id}`}>
                <div className="flex justify-center">
                  {/* Event Details */}
                  <div className="w-full max-w-4xl">
                    <div className="max-w-4xl mx-auto">
                      {/* 1. Heading */}
                      <div className="text-center mb-8 sm:mb-10 md:mb-12">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 mb-4">
                          <span className="px-3 py-1 bg-[#05B1DE] text-white text-sm font-semibold rounded-full">
                            {event.category}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(event.date)}
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4 flex items-center justify-center gap-2 sm:gap-3">
                          <span className="text-[#05B1DE] text-lg sm:text-xl md:text-2xl lg:text-3xl">
                            •
                          </span>
                          {event.title}
                        </h3>
                      </div>

                      {/* 2. Pixel Card */}
                      <div className="flex justify-center mb-8 sm:mb-10 md:mb-12">
                        <PixelCard variant="cyan" size="lg" imageSize="xl">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover rounded-2xl shadow-2xl transition-transform duration-500 group-hover:scale-105 z-10"
                          />
                        </PixelCard>
                      </div>

                      {/* 3. Description */}
                      <p className="text-gray-300 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                        {event.description}
                      </p>

                      {/* Infinite Moving Cards for events 1, 2, 4, and 5 */}
                      {(event.id === 1 ||
                        event.id === 2 ||
                        event.id === 4 ||
                        event.id === 5) && (
                        <div className="mb-8 sm:mb-10 md:mb-12 -mx-8 sm:-mx-12 md:-mx-16 lg:-mx-20 xl:-mx-24 2xl:-mx-32">
                          <div className="text-center mb-4 sm:mb-6 px-8 sm:px-12 md:px-16 lg:px-20 xl:px-24 2xl:px-32">
                            <h4 className="text-lg sm:text-xl font-semibold text-white">
                              Glimpse of the Event
                            </h4>
                          </div>
                          <div className="h-[15rem] sm:h-[18rem] md:h-[20rem] w-full rounded-md flex flex-col antialiased bg-black items-center justify-center relative overflow-hidden">
                            <InfiniteMovingCards
                              items={
                                event.id === 1
                                  ? event1Gallery
                                  : event.id === 2
                                    ? event2Gallery
                                    : event.id === 4
                                      ? event4Gallery
                                      : event5Gallery
                              }
                              direction="right"
                              speed="slow"
                            />
                          </div>
                        </div>
                      )}

                      {/* Event Stats */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
                        <div className="bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm">
                          <div className="text-xl sm:text-2xl font-bold text-blue-400">
                            {event.attendees}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-300">
                            Attendees
                          </div>
                        </div>
                        <div className="bg-gray-800 p-3 sm:p-4 rounded-lg shadow-sm">
                          <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-400 truncate">
                            {event.location.split(',')[0]}
                          </div>
                          <div className="text-xs sm:text-sm text-gray-300">
                            Location
                          </div>
                        </div>
                      </div>

                      {/* Event Highlights */}
                      <div className="mb-4 sm:mb-6">
                        <h4 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">
                          Event Highlights
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {event.highlights.map((highlight, idx) => (
                            <div
                              key={idx}
                              className="flex items-center text-xs sm:text-sm text-gray-300"
                            >
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-500 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {highlight}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Winner Badge for Competition */}
                      {event.winner && (
                        <div className="mb-4 sm:mb-6">
                          <div className="bg-gray-800 text-white p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-700">
                            <div className="flex items-center mb-3 sm:mb-4">
                              <div className="bg-white/20 p-2 rounded-full mr-3">
                                <svg
                                  className="w-5 h-5 sm:w-6 sm:h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                  />
                                </svg>
                              </div>
                              <h4 className="text-lg sm:text-xl font-bold text-white">
                                Competition Winners
                              </h4>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/20">
                              <div className="text-center">
                                <span
                                  className="text-base sm:text-lg font-semibold leading-relaxed"
                                  dangerouslySetInnerHTML={{
                                    __html: event.winner,
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Event Barrier/Divider */}
                {index < pastEvents.length - 1 && (
                  <div className="mt-12 sm:mt-16 md:mt-20 mb-8 sm:mb-10 md:mb-12 flex justify-center">
                    <div className="relative group">
                      {/* Main gradient line with glow effect */}
                      <div className="w-64 sm:w-80 md:w-96 lg:w-300 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Center diamond with gradient */}
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-5 h-5 sm:w-6 sm:h-6 bg-[#05B1DE] rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                      </div>

                      {/* Decorative dots */}
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 -translate-x-6 sm:-translate-x-8 w-1 h-1 bg-blue-400 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 translate-x-6 sm:translate-x-8 w-1 h-1 bg-purple-400 rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>

                      {/* Subtle glow effect */}
                      <div className="absolute -top-3 sm:-top-4 left-1/2 transform -translate-x-1/2 w-10 sm:w-12 h-6 sm:h-8 bg-[#05B1DE]/20 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Events;
