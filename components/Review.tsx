"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "Ahmed Ali",
    image: "/user-2.jpg",
    rating: 5,
    comment:
      "The coffee tasted incredibly fresh and rich. One of the best cafés I’ve tried!",
    date: "2 days ago",
  },

  {
    id: 2,
    name: "Sara Mohamed",
    image: "/user-1.jpg",
    rating: 4,
    comment:
      "Fast delivery and premium coffee beans. Highly recommended for coffee lovers.",
    date: "1 week ago",
  },

  {
    id: 3,
    name: "Omar Khaled",
    image: "/user-3.jpg",
    rating: 5,
    comment:
      "Loved the atmosphere and the iced latte was absolutely perfect.",
    date: "3 days ago",
  },
];

export default function ReviewsSection() {
  return (

    <section className="py-10 px-4 rounded-lg mt-14 mb-14">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 100 }}

          whileInView={{ opacity: 1, y: 0 }}

          transition={{ duration: 0.7 , delay : 0.2 }}

          viewport={{ once: true }}

          className="mb-14 text-center"
        >
          <h2 className="text-4xl font-bold text-[#4B2E2B]">
            Customer Reviews
          </h2>

          <p className="text-[#2B2B2B]/70 mt-3">
             Customer experiences with our signature coffee.
          </p>
        </motion.div>

        {/* Reviews */}

        <div className="flex flex-wrap justify-center gap-8">

          {reviews.map((review, index) => (
            <motion.div
              key={review.id}

              initial={{ opacity: 0, y: 30 }}

              whileInView={{ opacity: 1, y: 0 }}

              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}

              viewport={{ once: true }}

        
              className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-white/10
              bg-gradient-to-r from-[#2B2B2B] to-[#4B2E2B]
              backdrop-blur-xl
              p-6
              shadow-[0_0_30px_rgba(187,134,252,0.08)]
              
            w-full sm:w-[45%] lg:w-[30%]

              "
            >
              {/* Glow Effect */}

              <div
                className="
                absolute
                top-0
                right-0
                w-32
                h-32
                bg-[#BB86FC]/20
                blur-3xl
                rounded-full
                "
              />

              {/* User */}

              <div className="flex items-center gap-4 relative z-10">

                <div className="relative w-14 h-14">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="text-[#FAF7F0] font-semibold text-lg">
                    {review.name}
                  </h3>

                  <p className="text-sm text-[#EADBC8]">
                    {review.date}
                  </p>
                </div>
              </div>

              {/* Stars */}

              <div className="flex gap-1 mt-5 relative z-10">

                {[...Array(review.rating)].map((_, index) => (

                //   استخدمت مصفوفة هنا عشان خاطر اكرر نجوم والماب مش بيشتغل غير على مصفوفة وبيرجع قيم في مصفوفة كمان مينفعش هروح لفونشين ستار واكتبهم خمس مرات لكل كومنت عندي عملت مصفوفة كتبتلوة ان ريفيو راتيجن دي داخل مصفوفة وعملت سبيرد اوبيرتور عشان انسخ قيم بتاعتي ويبدا العد بتاعة انا هنا عرفت ان العناصر عندي 5 عشان كدة كتبتلوة كلمة اريية وعرفتة ان هو هيشتغل ع مصفوفة وكمان مش عايزين قيم في حاجة احنا عايزين انديكس بتاع كل اوبجكيت فيهم اللى قيم الرقمية بتاع ريفيو راتينج

                  <motion.div

                    key={index}

                    initial={{ scale: 0 }}

                    whileInView={{ scale: 1 }}

                    transition={{
                      delay: index * 0.1,
                      duration : 0.6
                    }}

                    viewport={{ once: true }}
                  >
                    <Star
                      size={18}
                      className="
                      fill-yellow-400
                      text-yellow-400
                      "
                    />
                  </motion.div>
                ))}
              </div>

              {/* Comment */}

              <p
                className="
                text-[#EADBC8]
                leading-relaxed
                mt-5
                relative
                z-10
                "
              >
                {review.comment}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}