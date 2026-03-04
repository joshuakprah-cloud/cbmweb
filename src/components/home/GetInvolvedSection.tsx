import Link from 'next/link';
import { Church, Users, HandHeart, UserPlus } from 'lucide-react';

const GetInvolvedSection = () => {
  const steps = [
    {
      icon: Church,
      title: 'Attend a Service',
      description: 'Join us for worship and fellowship every Sunday at 10 AM.',
      button: 'Plan Your Visit',
      link: '/'
    },
    {
      icon: Users,
      title: 'Join a Ministry',
      description: 'Find your calling and serve in one of our many ministries.',
      button: 'Explore Ministries',
      link: '/ministries'
    },
    {
      icon: HandHeart,
      title: 'Serve',
      description: 'Volunteer your time and talents to help our community.',
      button: 'Get Started',
      link: '/contact'
    },
    {
      icon: UserPlus,
      title: 'Become a Member',
      description: 'Take the next step and become part of our church family.',
      button: 'Learn More',
      link: '/contact'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Get Involved</h2>
        <div className="flex flex-col md:flex-row gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="flex-1 text-center">
                <div className="mb-4 flex justify-center">
                  <IconComponent size={48} className="text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-6">{step.description}</p>
                <Link href={step.link} className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600">
                  {step.button}
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GetInvolvedSection;
