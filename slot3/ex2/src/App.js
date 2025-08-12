import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonList from './components/PersonList';
import PersonFilter from './components/PersonFilter';
import SkillRanking from './components/SkillRanking';
import PersonSearch from './components/PersonSearch';

function App() {
  return (
    <div className="container mt-4">
      <h2 className="mb-3">1. Danh sách & Sort First Name</h2>
      <PersonList />
      <h2 className="mt-5 mb-3">2. Lọc theo độ tuổi & Skill</h2>
      <PersonFilter />
      <h2 className="mt-5 mb-3">3. Bảng xếp hạng Skill</h2>
      <SkillRanking />
      <h2 className="mt-5 mb-3">4. Tìm kiếm & Thống kê</h2>
      <PersonSearch />
    </div>
  );
}

export default App;
