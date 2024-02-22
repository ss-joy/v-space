import Image from "next/image";
import { Inter, Pacifico } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
});
export default function HomePage() {
  return (
    <div>
      <div>
        <p>Welcome to</p>
        <span className={`${pacifico.className}`}>v-space</span>
      </div>
    </div>
  );
}
