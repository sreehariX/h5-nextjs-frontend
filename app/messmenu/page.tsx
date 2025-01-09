'use client'

import MainLayout from '../components/MainLayout'
import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import '../styles/mess-menu.css'


const menuData = {
  MONDAY: {
    date: '06-01-2025',
    BREAKFAST: [
      'Kanda Poha',
      'Sev + Tari',
      'Boiled Chana',
      'BBJ',
      'Milk',
      'Tea/Coffee',
      'Boiled Egg/Egg Burji',
      'Chocos / Cornflakes',
      'Banana',
      'Bournvita+ Paneer Bhurji'
    ],
    LUNCH: [
      'Coriander Rice',
      'Dal Fry',
      'Rajma Masala',
      'Aloo Flower',
      'Roti',
      'Fryums',
      'Carrot + Beetroot',
      'Peanut Chutney',
      'Curd + Sambhar',
      'Nibu Pani'
    ],
    SNACKS: [
      'Fried Maggi',
      'Banana Shake',
      'BBJ',
      'Tea/Coffee'
    ],
    DINNER: [
      'Lemon Rice',
      'Dal Tadka',
      'Dum Aloo Gravy',
      'Tawa Veg',
      'Roti',
      'Carrot + Beetroot'
    ],
    'SWEET EXTRAS': [
      'Pineapple Sheera',
      'Paneer Handi'
    ]
  },
  TUESDAY: {
    date: '07-01-2025',
    BREAKFAST: [
      'Puri Bhaji',
      'Boiled Chawli',
      'BBJ',
      'Milk',
      'Tea/Coffee',
      'Boiled Egg/Egg Burji',
      'Musli / Oats',
      'Banana',
      'Bournvita+ Paneer Bhurji'
    ],
    LUNCH: [
      'Lemon Rice',
      'Moong Dal',
      'Kabuli Chana Masala',
      'Lauki Sabji',
      'Roti',
      'Potato Chips',
      'Black Chana Chaat',
      'Pudina Chutney',
      'Rasam',
      'Chaas'
    ],
    SNACKS: [
      'Bhelpuri',
      'Water Melon',
      'BBJ',
      'Tea/Coffee'
    ],
    DINNER: [
      'Plain Rice',
      'Mix Dal',
      'Paneer Do Pyaza',
      'Dry Bhindi',
      'Triangle Paratha',
      'Gulab Jamun',
      'Egg Curry'
    ],
    'SWEET EXTRAS': [
      'Gulab Jamun',
      'Egg Curry'
    ]
  },
  WEDNESDAY: {
    date: '08-01-2025',
    BREAKFAST: [
      'Onion Uttapam',
      'Sambhar + Chutney',
      'Boiled Corn',
      'BBJ',
      'Milk',
      'Tea/Coffee',
      'Boiled Egg/Omlette',
      'Cornflakes / Oats',
      'Banana',
      'Bournvita+ Paneer Bhurji'
    ],
    LUNCH: [
      'Tamarind Rice',
      'Plain Dal',
      'Bhandara Sabji',
      'White Bhopla Dry',
      'Roti',
      'Fried Papad',
      'Cucumber + Carrot + Onion',
      'Thecha',
      'Sambhar',
      'Rasna'
    ],
    SNACKS: [
      'Cheese Burger',
      'Orange',
      'BBJ',
      'Tea/Coffee'
    ],
    DINNER: [
      'Jeera rice',
      'Dal Makhni',
      'Malai Kofta',
      'Kadoo Methi Dry',
      'Roti',
      'Cucumber + Carrot'
    ],
    'SWEET EXTRAS': [
      'Moong Dal Halwa',
      'Butter Chicken Masala'
    ]
  },
  THURSDAY: {
    date: '09-01-2025',
    BREAKFAST: [
      'Mix Veg Paratha',
      'Dahi + Ketchup',
      'Matki Sprouts',
      'BBJ',
      'Milk',
      'Tea/Coffee',
      'Boiled Egg/Omlette',
      'Chocos / Cornflakes',
      'Banana',
      'Bournvita+ Paneer Bhurji'
    ],
    LUNCH: [
      'Geera Rice',
      'Dal Fry',
      'Chole Bhature',
      'Aloo Dum',
      'Roti',
      'Fried Papad',
      'Cucumber+ Beetroot',
      'Tomato Chutney',
      'Rasam',
      'Lassi'
    ],
    SNACKS: [
      'Veg Mayonnaise Sandwich',
      'Guava',
      'BBJ',
      'Tea/Coffee'
    ],
    DINNER: [
      'Veg Biryani',
      'Dal Lahsooni',
      'Mix Veg Masala',
      'Soyabean Chilly Dry',
      'Roti + Raita',
      'Cucumber+ Beetroot'
    ],
    'SWEET EXTRAS': [
      'Ice cream',
      'Paneer Kolhapuri'
    ]
  },
  FRIDAY: {
    date: '10-01-2025',
    BREAKFAST: [
      'Rava Idli + Medu Vada',
      'Groundnut Chutney',
      'Mix Sprouts',
      'BBJ',
      'Milk',
      'Tea/Coffee',
      'Boiled Egg/Egg Burji',
      'Musli / Oats',
      'Banana',
      'Bournvita+ Paneer Bhurji'
    ],
    LUNCH: [
      'Tomato Rice',
      'Plain Dal',
      'Mashroom Masala',
      'Bhindi Dry',
      'Roti',
      'Roasted Papad',
      'Beetroot + Carrot',
      'Thecha',
      'Curd + Sambhar',
      'Jal Jeera'
    ],
    SNACKS: [
      'Samosa Chat',
      'Musk Melon',
      'BBJ',
      'Tea/Coffee'
    ],
    DINNER: [
      'Fried Rice',
      'Tomato Dal',
      'Veg Manchurian Gravy',
      'Aloo China Dry',
      'Roti',
      'Cucumber + Carrot'
    ],
    'SWEET EXTRAS': [
      'Coconut Barfi',
      'Lollipop'
    ]
  },
  SATURDAY: {
    date: '11-01-2025',
    BREAKFAST: [
      'Aloo Paratha',
      'Dahi + Ketchup',
      'Peanuts Boiled',
      'BBJ',
      'Milk',
      'Tea/Coffee',
      'Boiled Egg/Omlette',
      'Chocos / Cornflakes',
      'Banana',
      'Bournvita+ Paneer Bhurji'
    ],
    LUNCH: [
      'Curd Rice',
      'Chana Dal',
      'Veg Kolhapuri',
      'Gobi 65',
      'Roti',
      'Fryums',
      'Carrot+ Beetroot + Onion',
      'Tomato Chutney',
      'Rasam',
      'Ice Tea'
    ],
    SNACKS: [
      'Misal pav',
      'Pomogranate',
      'BBJ',
      'Tea/Coffee'
    ],
    DINNER: [
      'Tawa Pulav',
      'Toor Dal',
      'Vatana Utsal',
      'Baigan Bharta',
      'Roti',
      'Corn Salad'
    ],
    'SWEET EXTRAS': [
      'Kalakhand',
      'Chicken Biryani'
    ]
  },
  SUNDAY: {
    date: '12-01-2025',
    BREAKFAST: [
      'Masala Dosa',
      'Sambhar + Chutney',
      'Moong Sprout',
      'BBJ',
      'Milk',
      'Tea/Coffee',
      'Boiled Egg/Egg Burji',
      'Musli / Oats',
      'Banana',
      'Bournvita+ Paneer Bhurji'
    ],
    LUNCH: [
      'Ghee Rice',
      'Dal Haryali',
      'Nimona',
      'Mix Veg',
      'Roti',
      'Potato Chips',
      'Sev Chaat',
      'Peanut Chutney',
      'Sambhar',
      'Chhas'
    ],
    SNACKS: [
      'Dahi puri',
      'Orange',
      'BBJ',
      'Tea/Coffee'
    ],
    DINNER: [
      'Plain Rice',
      'Dal Fry',
      'Paneer Aachari',
      'Zunka',
      'Naan',
      'Black Chana Chaat'
    ],
    'SWEET EXTRAS': [
      'Rasgulla',
      'Fish Fry'
    ]
  }
}

const MEALS = ['BREAKFAST', 'LUNCH', 'SNACKS', 'DINNER', 'SWEET EXTRAS'] as const
const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY'] as const

type MealType = typeof MEALS[number]
type DayType = typeof DAYS[number]

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
}
  
const TimingCard = () => (
  <div className="timings-card">
    <h3>Meal Timings</h3>
    <div className="timing-grid">
      <div>
        <h4>Weekdays</h4>
        <p>Breakfast: 7:30 AM to 9:45 AM</p>
        <p>Lunch: 12:00 Noon to 2:15 PM</p>
        <p>Tiffin: 4:30 PM to 6:15 PM</p>
        <p>Dinner: 7:30 PM to 9:45 PM</p>
      </div>
      <div>
        <h4>Weekends</h4>
        <p>Breakfast: 8:00 AM to 10:00 AM</p>
        <p>Lunch: 12:00 Noon to 2:15 PM</p>
        <p>Tiffin: 4:30 PM to 6:15 PM</p>
        <p>Dinner: 7:30 PM to 9:45 PM</p>
      </div>
    </div>
  </div>
)

const DayTab = ({ day, isActive, onClick, date }: {
  day: DayType
  isActive: boolean
  onClick: () => void
  date: string
}) => (
  <button 
    className={`day-tab ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    <div className="day-info">
      <span className="day-name">{day}</span>
      <span className="day-date">{date}</span>
    </div>
  </button>
)

const MealTab = ({ meal, isActive, onClick }: {
  meal: MealType
  isActive: boolean
  onClick: () => void
}) => (
  <button 
    className={`meal-tab ${isActive ? 'active' : ''}`}
    onClick={onClick}
  >
    {meal === 'SWEET EXTRAS' ? (
      <div className="meal-type">
        <span className="meal-name">SWEET</span>
        <span className="meal-extra">& EXTRAS</span>
      </div>
    ) : meal}
  </button>
)

const MenuItems = ({ items }: { items: string[] }) => (
  <div className="menu-items">
    {Array.isArray(items) && items.map((item, index) => (
      <motion.div 
        key={index}
        className="menu-item"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
      >
        {item}
      </motion.div>
    ))}
  </div>
)

const MenuNotes = () => (
  <div className="menu-notes">
    <p>* lemon+chilli+salt+pickle will be there at both lunch and dinner</p>
    <p>* Peanut butter at Snacks on every Monday and Thursday</p>
    <p>* Omelette/Half Fry/Full Fry at Snacks for Rs.20</p>
    <p>* Bournvita everyday in Breakfast</p>
  </div>
)

export default function MessMenu() {
  const [selectedDay, setSelectedDay] = useState<DayType>('MONDAY')
  const [selectedMeal, setSelectedMeal] = useState<MealType>('BREAKFAST')

  const currentMenu = useMemo(() => 
    menuData[selectedDay][selectedMeal],
    [selectedDay, selectedMeal]
  )

  return (
    <MainLayout>
      <div className="mess-menu-container">
        <motion.div 
          className="mess-menu-header"
          {...fadeInUp}
          transition={{ duration: 0.5 }}
        >
          <h1>MESS MENU</h1>
          <div className="current-date">
            <h3>{menuData[selectedDay].date}</h3>
          </div>
          <TimingCard />
        </motion.div>

        <motion.div 
          className="days-navigation"
          {...fadeIn}
          transition={{ delay: 0.2 }}
        >
          {DAYS.map((day) => (
            <DayTab
              key={day}
              day={day}
              isActive={selectedDay === day}
              onClick={() => setSelectedDay(day)}
              date={menuData[day].date}
            />
          ))}
        </motion.div>

        <motion.div 
          className="meals-navigation"
          {...fadeIn}
          transition={{ delay: 0.3 }}
        >
          {MEALS.map((meal) => (
            <MealTab
              key={meal}
              meal={meal}
              isActive={selectedMeal === meal}
              onClick={() => setSelectedMeal(meal)}
            />
          ))}
        </motion.div>

        <motion.div 
          className="menu-content"
          {...fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <div className="menu-card">
            <h2>{selectedDay} - {selectedMeal}</h2>
            <MenuItems items={currentMenu} />
          </div>
        </motion.div>

        <MenuNotes />
      </div>
    </MainLayout>
  )
}