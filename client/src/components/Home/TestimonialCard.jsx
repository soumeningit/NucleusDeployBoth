import { FaStar } from "react-icons/fa";

function TestimonialCard({ quote, name, role, avatar }) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg text-center h-full flex flex-col justify-center">
      <div className="flex justify-center mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar key={i} className="text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-600 italic mb-6">"{quote}"</p>
      <div className="flex items-center justify-center mt-auto">
        <img
          src={avatar}
          alt={name}
          className="w-12 h-12 rounded-full mr-4 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/48x48/CCCCCC/FFFFFF?text=??";
          }}
        />
        <div>
          <h4 className="font-bold text-gray-800">{name}</h4>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;
