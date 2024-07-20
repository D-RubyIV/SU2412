import React, { useState, useEffect } from "react";
import axios from "axios";

// Interface for defining the shape of the province object
interface Province {
  Id: number;
  Code: string;
  Name: string;
}

// Interface for defining the shape of the district object
interface District {
  Id: number;
  Code: string;
  Name: string;
  ProvinceId: number;
}

// Interface for defining the shape of the ward object
interface Ward {
  Id: number;
  Code: string;
  Name: string;
  DistrictId: number;
}

const FilterByProvinceForm: React.FC = () => {
  // State variables
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<Province | null>(
    null
  );
  const [selectedDistrict, setSelectedDistrict] = useState<District | null>(
    null
  );

  // Fetch provinces data
  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get<Province[]>(
          "https://api.npoint.io/ac646cb54b295b9555be"
        );
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  // Fetch districts data based on selected province
  useEffect(() => {
    if (selectedProvince) {
      const fetchDistricts = async () => {
        try {
          const response = await axios.get<District[]>(
            "https://api.npoint.io/34608ea16bebc5cffd42"
          );
          const filteredDistricts = response.data.filter(
            (district) => district.ProvinceId === selectedProvince.Id
          );
          setDistricts(filteredDistricts);
        } catch (error) {
          console.error("Error fetching districts:", error);
        }
      };
      fetchDistricts();
    }
  }, [selectedProvince]);

  // Fetch wards data based on selected district
  useEffect(() => {
    if (selectedDistrict) {
      const fetchWards = async () => {
        try {
          const response = await axios.get<Ward[]>(
            "https://api.npoint.io/dd278dc276e65c68cdf5"
          );
          const filteredWards = response.data.filter(
            (ward) => ward.DistrictId === selectedDistrict.Id
          );
          setWards(filteredWards);
        } catch (error) {
          console.error("Error fetching wards:", error);
        }
      };
      fetchWards();
    }
  }, [selectedDistrict]);

  const handleProvinceChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const provinceId = Number(event.target.value);
    const province =
      provinces.find((province) => province.Id === provinceId) || null;
    setSelectedProvince(province);
    setSelectedDistrict(null); // Reset selected district when province changes
  };

  const handleDistrictChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const districtId = Number(event.target.value);
    const district =
      districts.find((district) => district.Id === districtId) || null;
    setSelectedDistrict(district);
  };

  return (
    <div>
      <h2>Filter Information by Province</h2>
      <form>
        <div>
          <label>Province:</label>
          <select
            value={selectedProvince?.Id || ""}
            onChange={handleProvinceChange}
          >
            <option value="">Select Province</option>
            {provinces.map((province) => (
              <option key={province.Id} value={province.Id}>
                {province.Name}
              </option>
            ))}
          </select>
        </div>

        {selectedProvince && (
          <div>
            <label>District:</label>
            <select
              value={selectedDistrict?.Id || ""}
              onChange={handleDistrictChange}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.Id} value={district.Id}>
                  {district.Name}
                </option>
              ))}
            </select>
          </div>
        )}

        {selectedDistrict && (
          <div>
            <label>Ward:</label>
            <select>
              <option value="">Select Ward</option>
              {wards.map((ward) => (
                <option key={ward.Id} value={ward.Id}>
                  {ward.Name}
                </option>
              ))}
            </select>
          </div>
        )}
      </form>
    </div>
  );
};

export default FilterByProvinceForm;
