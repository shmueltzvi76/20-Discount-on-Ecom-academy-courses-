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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone || !formData.confirmed) {
      alert('אנא מלאו את כל השדות ואשרו את התנאים')
      return
    }

    setIsSubmitting(true)

    try {
      // Send to Formspree - replace YOUR_FORM_ID with actual ID from formspree.io
      const response = await fetch('https://formspree.io/f/xnjzlbvy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          source: 'Ecom Academy Landing Page',
          timestamp: new Date().toLocaleString('he-IL'),
        }),
      })

      if (response.ok) {
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-6 px-4 border-b border-gray-100">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-xl font-bold text-gray-800">
            <span className="gradient-text">Ecom</span> Academy
          </h2>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 pt-10 pb-8">
        <div className="max-w-lg mx-auto text-center">
          {/* Main Title */}
          <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-6">
            <span className="gradient-text">
              ביקשו ממני 800,000 ₪
            </span>
            <br />
            <span className="text-gray-900">
              כדי לפתח את הסטארט-אפ שלי.
            </span>
            <br />
            <span className="text-gray-900">
              אז החלטתי לבנות אותו לבד.
            </span>
          </h1>

          {/* Subtitle */}
          <div className="text-right text-gray-700 text-lg leading-relaxed space-y-4">
            <p>
              <span className="font-semibold">נעים להכיר, אני שמואל צבי.</span> יזם וסטודנט ל-Fullstack.
            </p>
            <p>
              הרבה אנשים שואלים אם שווה ללמוד תכנות בעידן ה-AI.
            </p>
            <p>
              <span className="font-semibold text-purple-700">התשובה שלי:</span> בזכות השילוב בין הידע שרכשתי בקורס לבין כלי AI, בניתי ב-4 ימים MVP (מוצר ראשוני) לאפליקציה מורכבת שהייתה עולה לי הון.
            </p>
            <p className="text-base text-gray-600">
              הנה הדרך שעברתי, העבודות שלי, והטבה ששמרתי למי שרוצה ללכת בדרך הזו.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-4 py-10 bg-gray-50">
        <div className="max-w-lg mx-auto">
          <div className="text-right space-y-6">
            <p className="text-gray-700 leading-relaxed">
              כשהתחלתי, המטרה לא הייתה רק "למצוא עבודה", אלא להוציא לפועל את הרעיונות שלי. הבנתי שבעולם היזמות, אם אתה לא מבין טכנולוגיה – <span className="font-semibold">אתה תלוי באחרים (ובכסף שלהם).</span>
            </p>

            {/* Why Ecom Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                למה בחרתי דווקא ב"איקום"? (הסיפור האמיתי)
              </h3>

              <div className="space-y-4 text-gray-700">
                <p>
                  את הקורס הזה התחלתי <span className="font-bold text-purple-700">3 פעמים</span>. כן, שמעתם נכון.
                </p>
                <p>
                  אתגרי החיים, העבודה והעומס גרמו לכך שנאלצתי לעצור פעמיים באמצע.
                </p>
                <p>
                  בכל מכללה אחרת היו אומרים לי: <span className="text-red-500">"מצטערים, תשלם שוב לקורס הבא"</span>.
                </p>
                <p>
                  באיקום? <span className="font-semibold text-green-600">לא עשו לי פרצוף חמוץ אפילו פעם אחת.</span> להפך – הם היו שם כדי להרים אותי, לתת לי גישה מחדש ולדחוף אותי לסיים.
                </p>
                <p className="font-medium">
                  הבנתי שההצלחה שלי חשובה להם לא פחות משהיא חשובה לי.
                </p>
              </div>
            </div>

            {/* Why not just AI */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <span className="text-2xl">🤖</span>
                למה לא הסתפקתי ב-AI?
              </h3>

              <p className="text-gray-700 leading-relaxed">
                גיליתי ש-AI הוא כלי מטורף, אבל אם אין לך את היסודות ("הלוגיקה של הקוד"), אתה מקבל מוצר מלא באגים שאתה לא יודע לתקן.
              </p>
              <p className="mt-3 font-semibold text-purple-700">
                השילוב המנצח הוא ידע חזק בבסיס + שימוש חכם בבינה מלאכותית.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio / Proof Section */}
      <section className="px-4 py-12 bg-white">
        <div className="max-w-lg mx-auto">
          <h2 className="text-2xl font-bold text-center mb-2 gradient-text">
            תיק העבודות – ההוכחה בשטח
          </h2>
          <p className="text-center text-gray-600 mb-8">
            מה אפשר לבנות עם הידע הזה?
          </p>

          {/* Games Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">🎮</span>
              </div>
              <div className="flex-1 text-right">
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  הבסיס: משחקים שפיתחתי בלימודים
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  שני משחקים שבניתי כחלק ממטלות הקורס (נטו קוד, בלי קיצורי דרך). כאן למדתי איך הדברים עובדים באמת "מתחת למכסה המנוע".
                </p>
                <div className="flex gap-3 flex-wrap">
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors"
                  >
                    <span>🕹️</span>
                    שחקו במשחק 1
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-100 transition-colors"
                  >
                    <span>🎯</span>
                    שחקו במשחק 2
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* MVP Card */}
          <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 shadow-lg border border-purple-100">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-3xl">💪</span>
              </div>
              <div className="flex-1 text-right">
                <div className="inline-block px-3 py-1 bg-purple-600 text-white text-xs font-bold rounded-full mb-2">
                  הדבר האמיתי
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  MVP לאפליקציית כושר חכמה
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  חיפשתי אפליקציה לניהול האימונים שלי שתדע לבצע חישובים מורכבים בזמן אמת. אף אפליקציה בחנויות לא נתנה לזה מענה.
                </p>
                <p className="text-gray-600 text-sm mb-4">
                  ביררתי בבתי תוכנה – פיתוח של גרסה ראשונית (MVP) כזו היה עולה לי באזור ה-<span className="font-bold text-red-500">90,000 ₪</span> ולוקח חודשים של עבודה.
                </p>

                {/* Result highlight */}
                <div className="bg-white rounded-xl p-4 border border-purple-200">
                  <p className="font-bold text-purple-700 mb-1">התוצאה?</p>
                  <p className="text-gray-700">
                    בתוך <span className="font-bold text-green-600">4 ימים בלבד</span>, בניתי את המערכת בעצמי בעלות של <span className="font-bold text-green-600">0 שקלים</span>, בעזרת השילוב של הידע מהקורס וכלי AI.
                  </p>
                  <p className="text-purple-700 font-semibold mt-2">
                    זה הכוח של Fullstack בידיים. 🚀
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="px-4 py-12 bg-gray-50" id="form">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <h2 className="text-2xl font-bold text-center mb-2 gradient-text">
              רוצים גם?
            </h2>
            <p className="text-center text-gray-600 mb-6 text-sm">
              אני לא עובד במכללה, אבל בתור סטודנט השגתי קוד הנחה של <span className="font-bold text-purple-700">20%</span> לנרשמים חדשים.
            </p>

            {/* How it works */}
            <div className="bg-purple-50 rounded-xl p-4 mb-6">
              <p className="font-semibold text-purple-800 mb-3 text-sm">איך זה עובד?</p>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                  <p>משאירים פרטים כאן למטה.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                  <p>אני מעביר את הבקשה למכללה ומפעיל עבורכם את קוד ההנחה שלי.</p>
                </div>
                <div className="flex items-start gap-2">
                  <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                  <p>יועץ לימודים רשמי של איקום יחזור אליכם לשיחה מסודרת עם כל הפרטים והמחיר המוזל.</p>
                </div>
              </div>
            </div>

            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">✓</span>
                </div>
                <h3 className="text-xl font-bold text-green-600 mb-2">הפרטים נשלחו בהצלחה!</h3>
                <p className="text-gray-600">נחזור אליכם בהקדם עם כל הפרטים.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    שם מלא
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="הכניסו את שמכם המלא"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-right text-gray-900 placeholder-gray-400 transition-all duration-200"
                    required
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1 text-right">
                    טלפון
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="050-1234567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl text-right text-gray-900 placeholder-gray-400 transition-all duration-200"
                    required
                  />
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="confirmed"
                    name="confirmed"
                    checked={formData.confirmed}
                    onChange={handleInputChange}
                    className="mt-1 w-5 h-5 border-2 border-gray-300 rounded cursor-pointer"
                    required
                  />
                  <label htmlFor="confirmed" className="text-sm text-gray-600 text-right cursor-pointer">
                    אני מאשר/ת שהפרטים שלי יועברו למכללת איקום לצורך קבלת פרטים על הקורס והמחיר המוזל.
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-purple-700 hover:bg-purple-800 text-white font-bold text-lg rounded-xl transition-all duration-200 animate-pulse-purple disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      שולח...
                    </span>
                  ) : (
                    'שלחו פרטים ושריינו לי 20% הנחה 🎁'
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-4 bg-white border-t border-gray-100">
        <div className="max-w-lg mx-auto text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} שמואל צבי כהן | סטודנט Fullstack באיקום
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
