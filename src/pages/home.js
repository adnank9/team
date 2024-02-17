import "./home.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";

const Home = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("")

    const fetchData = async () => {
        try {
            const response = await axios.get(
                "https://mocki.io/v1/ddb7e0a8-e218-4e36-b1be-b902cdb1c098"
            );
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const filteredAdmins = data.filter(
        (item) =>
            item.role === 'admin' &&
            (item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const filteredMembers = data.filter(
        (item) =>
            item.role === 'member' &&
            (item.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.last_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div>
            <nav className="top-nav">
                <div className="left">
                    <h2 className="poppins-regular">Team</h2>
                </div>
                <div className="right">
                    <input
                        type="text"
                        className="poppins-extralight"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FiSearch className="search-icon" />
                </div>
            </nav>

            <div className="user-section">
                <h2 className="heading poppins-regular">Administrators</h2>
                <div className="user-cards">
                    {filteredAdmins?.map((item) => (
                        <div key={item.email} className="user-card">
                            <img
                                src={item.img}
                                alt={`${item.first_name} ${item.last_name}`}
                                className="user-image"
                            />
                            <div className="user-details">
                                <p className="poppins-bold name">{`${item.first_name} ${item.last_name}`}</p>
                                <p className="poppins-extralight email"> {item.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section-divider" />

            <div className="user-section">
                <h2 className="heading  poppins-regular">Members</h2>
                <div className="user-cards">
                    {filteredMembers?.map((item) => (
                        <div key={item.email} className="user-card">
                            <img
                                src={item.img}
                                alt={`${item.first_name} ${item.last_name}`}
                                className="user-image"
                            />
                            <div className="user-details">
                                <p className="poppins-bold name">{`${item.first_name} ${item.last_name}`}</p>
                                <p className="poppins-extralight email"> {item.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
