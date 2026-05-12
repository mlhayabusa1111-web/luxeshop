export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-16 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-display text-2xl font-bold gradient-text mb-4">LUXE</h3>
            <p className="text-zinc-400 text-sm">
              Таны хэв маяг, таныг илтгэх Look Fashion Style. Дэлхийн шилдэг брэндүүд нэг дор.
            </p>
          </div>
          {[
            { title: 'Брэнд', items: ['Nike', 'Adidas', 'Zara', 'H&M'] },
            { title: 'Тусламж', items: ['Хүргэлт', 'Буцаалт', 'Түгээмэл асуулт', 'Холбоо барих'] },
            { title: 'Компани', items: ['Бидний тухай', 'Ажлын байр', 'Нууцлал', 'Нөхцөл'] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2">
                {col.items.map((item, j) => (
                  <li key={j}>
                    <a href="#" className="text-zinc-400 hover:text-white text-sm transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-zinc-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-400 text-sm">
            © 2024 LUXE. Бүх эрх хуулиар хамгаалагдсан.
          </p>
          <div className="flex gap-4">
            {['📘', '📸', '🐦'].map((icon, i) => (
              <a key={i} href="#" className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center hover:bg-zinc-700 transition-colors">
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
