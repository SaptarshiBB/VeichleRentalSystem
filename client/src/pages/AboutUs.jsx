import { useState } from 'react';

const AboutUs = () => {
  const [teamMembers, setTeamMembers] = useState([
    {
      name: 'Saptarshi Banerjee',
      role: 'Full Stack Developer',
      description: 'BTech CSE 3rd year student at Lovely Professional University. Passionate about building scalable web applications and exploring new technologies.',
      image: '/photos/saptarshi.png.jpeg'
    },
    {
      name: 'Rupesh Pradhan',
      role: 'Full Stack Developer',
      description: 'BTech CSE 3rd year student at Lovely Professional University. Enthusiastic about creating innovative solutions and learning cutting-edge development practices.',
      image: '/photos/rupesh.png.jpeg'
    },
    {
      name: 'Avinash Yadav',
      role: 'Full Stack Developer',
      description: 'BTech CSE 3rd year student at Lovely Professional University. Dedicated to crafting user-friendly interfaces and robust backend systems.',
      image: '/photos/avinash.png.jpeg'
    }
  ]);



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">About Us</h1>
          <p className="text-xl max-w-3xl mx-auto leading-relaxed">
            We are a team of passionate computer science students from Lovely Professional University,
            dedicated to creating innovative solutions in the car rental industry.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-600 leading-relaxed">
            This car rental platform was developed as part of our academic project to demonstrate
            our skills in full-stack web development. We aimed to create a seamless, user-friendly
            experience that combines modern design with robust functionality, making car rentals
            simple and accessible for everyone.
          </p>
        </div>

        {/* Team Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Meet Our Team</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            The brilliant minds behind this project
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Image Container */}
              <div className="relative h-80 bg-gradient-to-br from-primary-100 to-primary-200 overflow-hidden">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white text-6xl font-bold shadow-xl">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-primary-600 font-semibold mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Technology Stack Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Technology Stack</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Frontend</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                    React.js with Vite
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                    Tailwind CSS
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                    React Router
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                    WebSocket Integration
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Backend</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                    Node.js & Express
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                    MongoDB
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                    JWT Authentication
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                    RESTful API
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Project Info */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-2xl shadow-xl p-10 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Academic Project</h3>
            <p className="text-lg leading-relaxed">
              This car rental platform was developed as part of our coursework at Lovely Professional University.
              It showcases our understanding of modern web development practices, database management,
              user authentication, and real-time communication technologies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
