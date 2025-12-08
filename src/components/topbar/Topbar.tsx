import { TopbarWrapper, SearchInput } from "./Topbar.styles";
import { FiSearch } from "react-icons/fi";

export default function Topbar() {
    return (
        <TopbarWrapper>
            <FiSearch size={20} />
            <SearchInput placeholder="Search patients…" />
        </TopbarWrapper>
    );
}