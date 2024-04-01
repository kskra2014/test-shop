// ----------------------------------------------------------------------

import { redirect } from "next/navigation";

export const metadata = {
  title: 'David Boiler',
};

export default function HomePage() {
  return redirect('/product');
}
