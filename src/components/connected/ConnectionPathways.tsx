'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  UserGroupIcon,
  HomeIcon,
  HeartIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  SparklesIcon,
  CalendarIcon,
  HandRaisedIcon,
  GlobeAltIcon,
  BookOpenIcon,
  QuestionMarkCircleIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const ConnectionPathways = () => {
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const formSections = [
    {
      id: 1,
      title: 'Join & Membership',
      description: 'Become part of our church family and find your place to belong.',
      icon: UserGroupIcon,
      forms: [
        {
          name: 'Adult Membership',
          description: 'Join our church family and discover your spiritual home.',
          href: '#',
          icon: UserGroupIcon
          // TODO: Replace href with real form link
        },
        {
          name: 'Youth Membership',
          description: 'Connect with other young people growing in faith together.',
          href: '#',
          icon: HeartIcon
          // TODO: Replace href with real form link
        },
        {
          name: 'Children Membership',
          description: 'Register your children for our vibrant kids ministry.',
          href: '#',
          icon: HomeIcon
          // TODO: Replace href with real form link
        },
        {
          name: 'Join a Department',
          description: 'Use your gifts to serve and make a difference.',
          href: '#',
          icon: HandRaisedIcon
          // TODO: Replace href with real form link
        },
        {
          name: 'Married Couples Ministry',
          description: 'Strengthen your marriage with other couples.',
          href: '#',
          icon: HeartIcon
          // TODO: Replace href with real form link
        },
        {
          name: 'Media Ministry',
          description: 'Help us share our message through media and technology.',
          href: '#',
          icon: GlobeAltIcon
          // TODO: Replace href with real form link
        }
      ]
    },
    {
      id: 2,
      title: 'Life Events & Ceremonies',
      description: 'Celebrate important moments and milestones in your spiritual journey.',
      icon: SparklesIcon,
      forms: [
        {
          name: 'Baby Naming',
          description: 'Dedicate your precious child to God with our community.',
          href: '#',
          icon: SparklesIcon
          // TODO: Replace href with real form link
        },
        {
          name: 'Child Dedication',
          description: 'Commit your children to God in a special ceremony.',
          href: '#',
          icon: HeartIcon
          // TODO: Replace href with real form link
        },
        {
          name: 'Wedding Announcement',
          description: 'Share your joyous wedding celebration with our church.',
          href: '#',
          icon: SparklesIcon
          // TODO: Replace href with real form link
        },
        {
          name: 'Bereavement',
          description: 'Let us support you during times of loss and grief.',
          href: '#',
          icon: HeartIcon
          // TODO: Replace href with real form link
        }
      ]
    },
    {
      id: 3,
      title: 'Spiritual Support',
      description: 'Find guidance, prayer, and encouragement you need.',
      icon: HandRaisedIcon,
      forms: [
        {
          name: 'Prayer Request',
          description: 'Let our prayer team stand with you in faith.',
          href: '#',
          icon: ChatBubbleLeftRightIcon
          // TODO: Replace href with real form link
        },
        {
          name: 'Book Appointment',
          description: 'Meet with a pastor for guidance and counseling.',
          href: '#',
          icon: CalendarIcon
          // TODO: Replace href with real form link
        },
        {
          name: 'Share Testimony',
          description: 'Inspire others with what God has done in your life.',
          href: '#',
          icon: HeartIcon
          // TODO: Replace href with real form link
        }
      ]
    },
    {
      id: 4,
      title: 'Growth & Classes',
      description: 'Deepen your faith and grow spiritually through our classes.',
      icon: AcademicCapIcon,
      forms: [
        {
          name: 'ABC Classes',
          description: 'Build a strong foundation in our membership classes.',
          href: '#',
          icon: BookOpenIcon
          // TODO: Replace href with real form link
        },
        {
          name: 'Water Baptism',
          description: 'Take this important step of faith in your journey.',
          href: '#',
          icon: SparklesIcon
          // TODO: Replace href with real form link
        }
      ]
    },
    {
      id: 5,
      title: 'General Requests',
      description: 'Get help, ask questions, or request specific assistance.',
      icon: QuestionMarkCircleIcon,
      forms: [
        {
          name: 'Inquiry / Feedback',
          description: 'Ask questions or share your thoughts with us.',
          href: '#',
          icon: ChatBubbleLeftRightIcon
          // TODO: Replace href with real form link
        },
        {
          name: 'Request Unlisted Form',
          description: 'Need a form you don\'t see here? Let us know!',
          href: '#',
          icon: QuestionMarkCircleIcon
          // TODO: Replace href with real form link
        }
      ]
    }
  ];

  const toggleSection = (sectionId: number) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const getButtonLabel = (categoryTitle: string) => {
    switch (categoryTitle) {
      case 'Join & Membership':
        return 'Get Started';
      case 'Life Events & Ceremonies':
        return 'Submit Details';
      case 'Spiritual Support':
        return 'Reach Out';
      case 'Growth & Classes':
        return 'Sign Up';
      case 'General Requests':
        return 'Send Request';
      default:
        return 'Get Started';
    }
  };

  return (
    <section className="bg-white py-32">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-left mb-16">
          <span 
            className="text-gray-600 italic"
            style={{ 
              fontSize: '18px',
              fontFamily: 'Georgia, serif'
            }}
          >
            Get Involved
          </span>
          
          <h2 
            className="text-black font-bold mt-4 mb-6" 
            style={{ fontSize: '58px', lineHeight: '1.1' }}
          >
            How Can We Help You?
          </h2>
          
          <p 
            className="text-gray-600" 
            style={{ 
              fontSize: '16px', 
              lineHeight: '1.7', 
              maxWidth: '560px' 
            }}
          >
            Every form below is a doorway. Pick one that fits where you are right now.
          </p>
        </div>

        {/* Accordion Container */}
        <div 
          className="rounded-[20px] overflow-hidden"
          style={{ backgroundColor: '#e8e6df', padding: '40px 60px' }}
        >
          {formSections.map((section, index) => {
            const SectionIcon = section.icon;
            const isExpanded = expandedSection === section.id;
            const sectionNumber = String(section.id).padStart(2, '0');
            
            return (
              <div key={section.id}>
                {/* Accordion Row */}
                <div
                  className="flex items-center py-6 cursor-pointer hover:bg-white/50 transition-colors duration-200 rounded-lg"
                  onClick={() => toggleSection(section.id)}
                  style={{ minHeight: '80px' }}
                >
                  {/* Section Number */}
                  <div 
                    className="text-6xl font-serif mr-8 opacity-20"
                    style={{ fontFamily: 'Georgia, serif', color: '#6B7280' }}
                  >
                    {sectionNumber}
                  </div>

                  {/* Icon and Title */}
                  <div className="flex items-center flex-1">
                    <SectionIcon className="w-6 h-6 text-teal-600 mr-4" />
                    <h3 
                      className="font-bold text-black"
                      style={{ fontSize: '22px' }}
                    >
                      {section.title}
                    </h3>
                  </div>

                  {/* Expand/Collapse Icon */}
                  <div className="ml-8">
                    {isExpanded ? (
                      <XMarkIcon className="w-6 h-6 text-gray-600" />
                    ) : (
                      <PlusIcon className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                </div>

                {/* Divider (except after last item) */}
                {index < formSections.length - 1 && (
                  <div className="border-t border-gray-300 my-2"></div>
                )}

                {/* Expanded Content */}
                <div
                  className={`overflow-hidden transition-all duration-400 ease-in-out ${
                    isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pt-6 pb-8">
                    {/* Form Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {section.forms.map((form, formIndex) => {
                        const FormIcon = form.icon;
                        
                        return (
                          <div
                            key={formIndex}
                            className="bg-white rounded-[16px] p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                          >
                            {/* Icon */}
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-100 rounded-lg mb-4">
                              <FormIcon className="w-6 h-6 text-teal-600" />
                            </div>

                            {/* Title */}
                            <h4 
                              className="font-bold text-black mb-3"
                              style={{ fontSize: '17px' }}
                            >
                              {form.name}
                            </h4>

                            {/* Description */}
                            <p 
                              className="text-gray-600 mb-6 leading-relaxed"
                              style={{ fontSize: '15px', lineHeight: '1.7' }}
                            >
                              {form.description}
                            </p>

                            {/* Button */}
                            <Link
                              href={form.href}
                              className="inline-flex items-center bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-[50px] transition-all duration-200 hover:scale-105 text-center"
                              style={{ fontSize: '13px', letterSpacing: '0.05em' }}
                            >
                              {getButtonLabel(section.title)}
                              <svg
                                className="w-4 h-4 ml-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            </Link>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ConnectionPathways;
