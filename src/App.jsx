import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    confirmed: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const scrollToForm = () => {
    document.getElementById('form-section').scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.confirmed) {
      alert('אנא מלאו את כל השדות ואשרו את התנאים')
      return
    }

    setIsSubmitting(true)

    const submissionData = {
      name: formData.name,
      phone: formData.phone,
      source: 'Ecom Academy Landing Page',
      timestamp: new Date().toLocaleString('he-IL'),
    }

    try {
      const [formspreeResponse] = await Promise.all([
        fetch('https://formspree.io/f/xnjzlbvy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(submissionData),
        }),
        fetch('https://hook.eu1.make.com/gnxlb8vexco37kxy03j7crx1pp4putjy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(submissionData),
        }).catch(err => console.log('Make.com webhook error:', err)),
      ])

      if (formspreeResponse.ok) {
        setIsSubmitted(true)
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      alert('שגיאה בשליחה, אנא נסו שוב')
      console.error('Form error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const CTAButton = ({ className = "" }) => (
    <button
      onClick={scrollToForm}
      className={`px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 animate-pulse-purple ${className}`}
    >
      רוצה את ההטבה - השאירו פרטים ←
    </button>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header - Sticky */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm py-4 px-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">
            <span className="gradient-text">Ecom</span> Academy
          </h2>
          <button
            onClick={scrollToForm}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold rounded-full transition-colors"
          >
            קבלו 20% הנחה
          </button>
        </div>
      </header>

      {/* Hero Section - Full Impact */}
      <section className="relative bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 text-white overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-10 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur rounded-full text-sm font-medium mb-6 border border-white/20">
              🎓 הסיפור האמיתי של סטודנט
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-6">
              ביקשו ממני
              <span className="block text-yellow-400 my-2">800,000 ₪</span>
              כדי לפתח את הסטארט-אפ שלי
            </h1>

            <p className="text-xl md:text-2xl text-purple-100 mb-8 font-light">
              אז החלטתי לבנות אותו <span className="font-bold text-white">לבד.</span>
            </p>

            <CTAButton className="mb-8" />

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-purple-200">
              <span className="flex items-center gap-2">
                <span className="text-green-400">✓</span> ללא התחייבות
              </span>
              <span className="flex items-center gap-2">
                <span className="text-green-400">✓</span> שיחת ייעוץ חינם
              </span>
              <span className="flex items-center gap-2">
                <span className="text-green-400">✓</span> 20% הנחה מובטחת
              </span>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            {/* Avatar/Image placeholder */}
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-purple-400 to-indigo-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-xl">
              <span className="text-5xl">👨‍💻</span>
            </div>

            <div className="text-center md:text-right">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                נעים להכיר, אני <span className="gradient-text">שמואל צבי</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-4">
                יזם וסטודנט ל-Fullstack. הרבה אנשים שואלים אם שווה ללמוד תכנות בעידן ה-AI.
              </p>
              <p className="text-lg text-gray-800 font-medium">
                <span className="text-purple-600">התשובה שלי:</span> בזכות השילוב בין הידע שרכשתי בקורס לבין כלי AI, בניתי ב-<span className="font-bold">4 ימים</span> MVP לאפליקציה שהייתה עולה לי הון.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { number: "4", label: "ימים לבניית MVP", icon: "⚡" },
              { number: "90K", label: "₪ נחסכו בפיתוח", icon: "💰" },
              { number: "3", label: "פעמים התחלתי מחדש", icon: "🔄" },
              { number: "20%", label: "הנחה בלעדית לכם", icon: "🎁" },
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <span className="text-3xl mb-2 block">{stat.icon}</span>
                <span className="text-3xl md:text-4xl font-black gradient-text">{stat.number}</span>
                <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Section - Cards */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            למה <span className="gradient-text">דווקא איקום?</span>
          </h2>
          <p className="text-gray-600 text-center mb-12 text-lg">הסיפור האמיתי שלי</p>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border border-red-100">
              <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">😤</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">הבעיה שפגשתי</h3>
              <p className="text-gray-600 leading-relaxed">
                את הקורס הזה התחלתי <span className="font-bold text-red-600">3 פעמים</span>. אתגרי החיים, העבודה והעומס גרמו לכך שנאלצתי לעצור פעמיים באמצע.
              </p>
              <p className="text-gray-600 mt-3">
                בכל מכללה אחרת היו אומרים לי: <span className="text-red-500 font-medium">"מצטערים, תשלם שוב"</span>
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-8 border border-green-100">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-3xl">💚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">מה קרה באיקום</h3>
              <p className="text-gray-600 leading-relaxed">
                <span className="font-bold text-green-600">לא עשו לי פרצוף חמוץ אפילו פעם אחת.</span> הם היו שם כדי להרים אותי, לתת לי גישה מחדש ולדחוף אותי לסיים.
              </p>
              <p className="text-green-700 font-semibold mt-3">
                ההצלחה שלי חשובה להם לא פחות משהיא חשובה לי.
              </p>
            </div>

            {/* Card 3 - Full width */}
            <div className="md:col-span-2 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-3xl p-8 border border-purple-100">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <span className="text-3xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">למה לא הסתפקתי ב-AI?</h3>
                  <p className="text-gray-600 leading-relaxed">
                    גיליתי ש-AI הוא כלי מטורף, אבל אם אין לך את היסודות - אתה מקבל מוצר מלא באגים שאתה לא יודע לתקן.
                  </p>
                  <p className="text-purple-700 font-bold mt-3 text-lg">
                    השילוב המנצח = ידע חזק בבסיס + שימוש חכם ב-AI 🚀
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA after cards */}
          <div className="text-center mt-12">
            <CTAButton />
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="px-4 py-16 bg-gradient-to-br from-gray-900 to-purple-900 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            תיק העבודות שלי 💼
          </h2>
          <p className="text-purple-200 text-center mb-12 text-lg">ההוכחה שזה עובד</p>

          {/* Games */}
          <div className="bg-white/10 backdrop-blur rounded-3xl p-8 mb-6 border border-white/10">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-4xl">🎮</span>
              </div>
              <div className="flex-1 text-center md:text-right">
                <span className="inline-block px-3 py-1 bg-purple-500/30 rounded-full text-sm font-medium mb-2">פרויקטי לימודים</span>
                <h3 className="text-xl font-bold mb-2">משחקים שפיתחתי בקורס</h3>
                <p className="text-purple-200 mb-4">
                  שני משחקים שבניתי כחלק ממטלות הקורס - נטו קוד, בלי קיצורי דרך. כאן למדתי את היסודות.
                </p>
                <div className="flex gap-3 flex-wrap justify-center md:justify-start">
                  <a href="#" className="px-5 py-2 bg-white text-purple-700 rounded-full font-semibold hover:bg-purple-100 transition-colors">
                    🕹️ משחק 1
                  </a>
                  <a href="#" className="px-5 py-2 bg-white text-purple-700 rounded-full font-semibold hover:bg-purple-100 transition-colors">
                    🎯 משחק 2
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* MVP - Highlight */}
          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 text-gray-900">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-4xl">💪</span>
              </div>
              <div className="flex-1 text-center md:text-right">
                <span className="inline-block px-3 py-1 bg-white/30 rounded-full text-sm font-bold mb-2">🔥 הישג מרכזי</span>
                <h3 className="text-2xl font-black mb-2">MVP לאפליקציית כושר חכמה</h3>
                <p className="text-gray-800 mb-4">
                  חיפשתי אפליקציה לניהול אימונים עם חישובים מורכבים בזמן אמת. בתי תוכנה ביקשו <span className="font-black">90,000 ₪</span> וחודשים של עבודה.
                </p>
                <div className="bg-white rounded-2xl p-4 shadow-lg">
                  <p className="font-black text-xl">
                    בניתי את זה ב-<span className="text-green-600">4 ימים</span> בעלות <span className="text-green-600">0 ₪</span>
                  </p>
                  <p className="text-purple-700 font-bold mt-1">זה הכוח של Fullstack + AI 🚀</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Urgency Section */}
      <section className="px-4 py-12 bg-yellow-50 border-y-4 border-yellow-200">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            ⚡ ההטבה מוגבלת בזמן
          </p>
          <p className="text-gray-600 text-lg mb-6">
            קוד ההנחה שלי תקף לנרשמים חדשים בלבד. לא בטוח עד מתי.
          </p>
          <CTAButton />
        </div>
      </section>

      {/* Form Section */}
      <section id="form-section" className="px-4 py-16 bg-gradient-to-br from-purple-600 to-indigo-700">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-2xl">
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-4">
                🎁 20% הנחה מובטחת
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                רוצים להצטרף?
              </h2>
              <p className="text-gray-600">
                השאירו פרטים ונציג מאיקום יחזור אליכם עם כל המידע + ההנחה שלי
              </p>
            </div>

            {/* How it works */}
            <div className="bg-gray-50 rounded-2xl p-4 mb-6">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  <span className="text-gray-600">משאירים פרטים</span>
                </div>
                <span className="text-gray-300">→</span>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                  <span className="text-gray-600">נציג חוזר</span>
                </div>
                <span className="text-gray-300">→</span>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  <span className="text-gray-600">מקבלים הנחה!</span>
                </div>
              </div>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🎉</span>
                </div>
                <h3 className="text-2xl font-bold text-green-600 mb-2">מעולה! הפרטים נשלחו</h3>
                <p className="text-gray-600">נציג מאיקום יחזור אליכם בהקדם עם כל הפרטים וההטבה.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    שם מלא
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="איך קוראים לך?"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-right text-gray-900 placeholder-gray-400 text-lg focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    מספר טלפון
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="050-1234567"
                    className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl text-right text-gray-900 placeholder-gray-400 text-lg focus:border-purple-500"
                    required
                  />
                </div>

                <div className="flex items-start gap-3 bg-purple-50 p-4 rounded-xl">
                  <input
                    type="checkbox"
                    id="confirmed"
                    name="confirmed"
                    checked={formData.confirmed}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 rounded cursor-pointer accent-purple-600"
                    required
                  />
                  <label htmlFor="confirmed" className="text-sm text-gray-600 cursor-pointer">
                    אני מאשר/ת לקבל שיחה מנציג מכללת איקום לקבלת פרטים על הקורס והמחיר המיוחד.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold text-xl rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-6 w-6" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      שולח...
                    </span>
                  ) : (
                    '🎁 שלחו לי את ההטבה!'
                  )}
                </button>

                <p className="text-center text-xs text-gray-500 mt-4">
                  🔒 הפרטים שלך מאובטחים ולא יועברו לצד שלישי
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-2">
            © {new Date().getFullYear()} שמואל צבי כהן | סטודנט Fullstack באיקום
          </p>
          <p className="text-sm text-gray-500">
            הדף הזה נבנה על ידי סטודנט, לא על ידי המכללה. ההטבה בתיאום עם מכללת איקום.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
