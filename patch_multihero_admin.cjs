const fs = require('fs');

let adminCode = fs.readFileSync('components/Admin.tsx', 'utf8');

// Replace HeroSettingsManager with MultiHero & Page Hero Manager
const oldHeroManagerStart = 'const HeroSettingsManager: React.FC = () => {';
const oldHeroManagerEnd = '// --- SECURITY & PASSWORD MANAGER ---';

const startIndex = adminCode.indexOf(oldHeroManagerStart);
const endIndex = adminCode.indexOf(oldHeroManagerEnd);

if (startIndex !== -1 && endIndex !== -1) {
  const newHeroManager = `const HeroSettingsManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"home" | "pages">("home");
  
  // Home Hero Multiple Images
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  // Sub-pages Banners
  const pagesList = [
    { key: "about", label: "About Us Page" },
    { key: "programs", label: "Programs Page" },
    { key: "admissions", label: "Admissions Page" },
    { key: "gallery", label: "Gallery Page" },
    { key: "franchise", label: "Franchise Page" },
    { key: "contact", label: "Contact Us Page" },
  ];
  const [selectedPage, setSelectedPage] = useState("about");
  const [pageBanners, setPageBanners] = useState<Record<string, string>>({});

  useEffect(() => {
    // Load home hero images
    api.getSiteSettings("hero").then((data) => {
      if (data) {
        if (Array.isArray(data.heroImages)) {
          setHeroImages(data.heroImages);
        } else if (data.heroImage) {
          setHeroImages([data.heroImage]);
        }
      }
    });

    // Load each page's banner
    pagesList.forEach((p) => {
      api.getSiteSettings(\`page_hero_\${p.key}\`).then((d) => {
        if (d && d.image) {
          setPageBanners((prev) => ({ ...prev, [p.key]: d.image }));
        }
      });
    });
  }, []);

  // Upload a new home hero banner
  const handleAddHeroImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setUploading(true);
    setMessage("");
    try {
      const res = await api.uploadHeroImage(file);
      if (res.success && res.url) {
        const updated = [...heroImages, res.url];
        setHeroImages(updated);
        await api.updateSiteSettings("hero", { heroImages: updated, heroImage: updated[0] });
        setMessage("Hero banner added and published live!");
        setTimeout(() => setMessage(""), 3500);
      } else {
        alert("Upload failed: " + res.message);
      }
    } catch (err: any) {
      alert("Error uploading: " + err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleRemoveHeroImage = async (indexToRemove: number) => {
    if (!window.confirm("Remove this hero image from home slider?")) return;
    const updated = heroImages.filter((_, i) => i !== indexToRemove);
    setHeroImages(updated);
    await api.updateSiteSettings("hero", { heroImages: updated, heroImage: updated[0] || "" });
    setMessage("Image removed from hero!");
    setTimeout(() => setMessage(""), 3000);
  };

  // Upload sub-page banner
  const handlePageBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setUploading(true);
    setMessage("");
    try {
      const res = await api.uploadHeroImage(file);
      if (res.success && res.url) {
        setPageBanners((prev) => ({ ...prev, [selectedPage]: res.url }));
        await api.updateSiteSettings(\`page_hero_\${selectedPage}\`, { image: res.url });
        setMessage(\`Banner for \${selectedPage} page updated successfully!\`);
        setTimeout(() => setMessage(""), 3500);
      } else {
        alert("Upload failed: " + res.message);
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleRemovePageBanner = async (pageKey: string) => {
    if (!window.confirm(\`Remove custom banner from \${pageKey} page?\`)) return;
    setPageBanners((prev) => ({ ...prev, [pageKey]: "" }));
    await api.updateSiteSettings(\`page_hero_\${pageKey}\`, { image: "" });
    setMessage(\`Banner removed from \${pageKey} page.\`);
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="max-w-4xl bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-100 font-sans">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 border-b pb-4">
        <div>
          <h3 className="text-2xl font-outfit font-bold text-gray-900">
            Hero & Page Banner Manager
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Manage multi-image carousel for the homepage, or set custom background banners for every sub-page.
          </p>
        </div>

        {/* Tab Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setActiveTab("home")}
            className={\`px-4 py-2 rounded-lg text-sm font-semibold transition-all \${
              activeTab === "home"
                ? "bg-white text-orange-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }\`}
          >
            Home Carousel ({heroImages.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("pages")}
            className={\`px-4 py-2 rounded-lg text-sm font-semibold transition-all \${
              activeTab === "pages"
                ? "bg-white text-orange-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }\`}
          >
            Sub-Pages Banners
          </button>
        </div>
      </div>

      {message && (
        <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 font-semibold text-sm">
          {message}
        </div>
      )}

      {activeTab === "home" ? (
        <div className="space-y-6">
          <div className="bg-amber-50/50 border border-amber-200/70 p-5 rounded-2xl">
            <h4 className="font-outfit font-bold text-gray-900 text-base mb-1">
              Add New Home Hero Slide
            </h4>
            <p className="text-xs text-gray-600 mb-3">
              Upload multiple banner images. If 2 or more images are uploaded, they automatically rotate in a smooth slideshow with navigation arrows and indicator dots.
            </p>
            <input
              type="file"
              accept="image/*, image/webp, image/png, image/jpeg"
              onChange={handleAddHeroImage}
              disabled={uploading}
              className="text-sm text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-orange-500 file:text-white hover:file:bg-orange-600 cursor-pointer"
            />
            {uploading && (
              <p className="text-xs text-orange-600 font-semibold mt-2 animate-pulse">
                Uploading to Supabase Storage...
              </p>
            )}
          </div>

          <div>
            <h4 className="font-outfit font-bold text-gray-900 text-base mb-3">
              Current Home Hero Slides ({heroImages.length})
            </h4>
            {heroImages.length === 0 ? (
              <p className="text-sm text-gray-400 py-6 text-center border-2 border-dashed rounded-2xl">
                No custom hero slides uploaded yet. The default banner will show.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {heroImages.map((url, idx) => (
                  <div
                    key={url + idx}
                    className="group relative rounded-2xl overflow-hidden border border-gray-200 bg-gray-50 shadow-sm"
                  >
                    <img
                      src={url}
                      alt={\`Slide \${idx + 1}\`}
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-2.5 flex items-center justify-between bg-white border-t">
                      <span className="text-xs font-semibold text-gray-700">
                        Slide {idx + 1}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveHeroImage(idx)}
                        className="px-2.5 py-1 text-xs font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-sm font-bold text-gray-700">Select Page:</label>
            <select
              value={selectedPage}
              onChange={(e) => setSelectedPage(e.target.value)}
              className="px-4 py-2 border rounded-xl text-sm font-semibold text-gray-800 bg-white"
            >
              {pagesList.map((p) => (
                <option key={p.key} value={p.key}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-blue-50/50 border border-blue-200/70 p-5 rounded-2xl">
            <h4 className="font-outfit font-bold text-gray-900 text-base mb-1">
              Upload Background Banner for {pagesList.find((p) => p.key === selectedPage)?.label}
            </h4>
            <p className="text-xs text-gray-600 mb-3">
              This image will be subtly blended into the top title bar of this page.
            </p>
            <input
              type="file"
              accept="image/*, image/webp, image/png, image/jpeg"
              onChange={handlePageBannerUpload}
              disabled={uploading}
              className="text-sm text-gray-700 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 cursor-pointer"
            />
            {uploading && (
              <p className="text-xs text-blue-600 font-semibold mt-2 animate-pulse">
                Uploading banner to Supabase...
              </p>
            )}
          </div>

          <div>
            <h4 className="font-outfit font-bold text-gray-900 text-base mb-3">
              Configured Page Banners
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pagesList.map((p) => {
                const bannerUrl = pageBanners[p.key];
                return (
                  <div
                    key={p.key}
                    className="rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden shadow-sm"
                  >
                    {bannerUrl ? (
                      <img
                        src={bannerUrl}
                        alt={p.label}
                        className="w-full h-28 object-cover"
                      />
                    ) : (
                      <div className="w-full h-28 flex items-center justify-center bg-gray-100 text-gray-400 text-xs font-medium">
                        Default Clean Navy Hero
                      </div>
                    )}
                    <div className="p-3 bg-white border-t flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800">{p.label}</span>
                      {bannerUrl && (
                        <button
                          type="button"
                          onClick={() => handleRemovePageBanner(p.key)}
                          className="text-xs font-semibold text-red-600 hover:underline"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

`;

  adminCode = adminCode.slice(0, startIndex) + newHeroManager + adminCode.slice(endIndex);
  fs.writeFileSync('components/Admin.tsx', adminCode);
  console.log('Admin Hero & Page manager successfully upgraded!');
} else {
  console.error('Could not find HeroSettingsManager bounds in Admin.tsx');
}
