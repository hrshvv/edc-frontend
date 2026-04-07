import React from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  IoLogoGithub,
  IoLogoLinkedin,
  IoShareSocialSharp,
} from 'react-icons/io5';
import { Button } from '@/components/ui/button';
const TeamCard = ({ name, role, image, linkedin, github }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden w-full max-w-64 min-h-80 relative group">
      <div className="w-full h-80 overflow-hidden">
        <img
          src={image}
          alt="Team member"
          className="w-full h-full object-cover transition-all duration-500 ease-in-out md:group-hover:blur-xs md:group-hover:scale-105"
        />
      </div>
      <div className="absolute z-10 bottom-0 w-full">
        <div className="bg-white text-black py-2 px-3 m-2 rounded-3xl transition-all duration-400 ease-in-out md:py-4 md:px-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-sm md:text-base">{name}</p>
              <p className="text-xs max-h-10 md:max-h-0 md:overflow-hidden md:group-hover:max-h-10 transition-all duration-400 ease-in-out">
                {role}
              </p>
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="!text-gray-600 md:hover:!text-gray-800 md:hover:!bg-gray-100 dark:!text-gray-600 dark:md:hover:!text-gray-800 dark:md:hover:!bg-gray-100"
                >
                  <IoShareSocialSharp />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="bg-black">
                <div className="space-y-2">
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-xs">{role}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Socials</p>
                    <div className="flex flex-wrap gap-1">

                      {linkedin && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-[18px]"
                          onClick={() => window.open(linkedin, '_blank')}
                        >
                          <IoLogoLinkedin />
                        </Button>
                      )}
                      {github && (
                        <Button
                          variant="outline"
                          size="icon"
                          className="text-[18px]"
                          onClick={() => window.open(github, '_blank')}
                        >
                          <IoLogoGithub />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
