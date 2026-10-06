import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  PenLine,
  Camera,
  Edit3,
  Save,
  X,
  LogOut,
  User,
  FileText,
  ArrowLeft,
} from "lucide-react";

function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [user, setUser] = useState(() => {
    return JSON.parse(
      localStorage.getItem("user") || "null"
    );
  });

  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(
    user?.name || ""
  );

  const defaultDescription =
    "Welcome to my profile. I love sharing ideas, learning new things and building useful projects.";

  const [description, setDescription] = useState(
    user?.description || defaultDescription
  );

  const [photo, setPhoto] = useState(
    user?.profileImage || ""
  );

  const [saving, setSaving] = useState(false);

  if (!user) {
    return (
      <main
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[#f8fafc]
          px-5
          transition-colors
          duration-300
          dark:bg-gray-950
        "
      >
        <div
          className="
            w-full
            max-w-md
            rounded-3xl
            border
            border-gray-200
            bg-white
            p-10
            text-center
            shadow-sm
            transition-colors
            dark:border-gray-800
            dark:bg-gray-900
          "
        >
          <div
            className="
              mx-auto
              flex
              h-16
              w-16
              items-center
              justify-center
              rounded-2xl
              bg-indigo-50
              text-indigo-600
              dark:bg-indigo-500/10
              dark:text-indigo-400
            "
          >
            <User size={28} />
          </div>

          <h1
            className="
              mt-6
              text-2xl
              font-black
              text-gray-950
              dark:text-white
            "
          >
            Please login
          </h1>

          <p
            className="
              mt-2
              text-gray-500
              dark:text-gray-400
            "
          >
            Login to view and manage your profile.
          </p>

          <Link
            to="/login"
            className="
              mt-7
              inline-flex
              items-center
              justify-center
              rounded-xl
              bg-indigo-600
              px-6
              py-3
              font-bold
              text-white
              transition
              hover:bg-indigo-700
            "
          >
            Login
          </Link>
        </div>
      </main>
    );
  }

  /* =========================
     PHOTO CHANGE
  ========================= */

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Please choose an image smaller than 2MB.");
      return;
    }

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  };

  /* =========================
     SAVE PROFILE
  ========================= */

  const handleSave = () => {
    if (!name.trim()) {
      alert("Name cannot be empty.");
      return;
    }

    setSaving(true);

    const updatedUser = {
      ...user,
      name: name.trim(),
      description: description.trim(),
      profileImage: photo,
    };

    localStorage.setItem(
      "user",
      JSON.stringify(updatedUser)
    );

    setUser(updatedUser);

    setTimeout(() => {
      setSaving(false);
      setEditing(false);
    }, 400);
  };

  /* =========================
     CANCEL EDIT
  ========================= */

  const handleCancel = () => {
    setName(user.name || "");

    setDescription(
      user.description || defaultDescription
    );

    setPhoto(user.profileImage || "");

    setEditing(false);
  };

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const firstLetter =
    name?.charAt(0)?.toUpperCase() || "U";

  return (
    <main
      className="
        min-h-screen
        bg-[#f8fafc]
        text-gray-900
        transition-colors
        duration-300
        dark:bg-gray-950
        dark:text-gray-100
      "
    >
      {/* =========================
          TOP NAV
      ========================= */}

      <div
        className="
          border-b
          border-gray-200
          bg-white
          transition-colors
          dark:border-gray-800
          dark:bg-gray-950
        "
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="
              flex
              items-center
              gap-2
              rounded-lg
              px-3
              py-2
              text-sm
              font-semibold
              text-gray-600
              transition
              hover:bg-gray-100
              hover:text-gray-950
              dark:text-gray-400
              dark:hover:bg-gray-800
              dark:hover:text-white
            "
          >
            <ArrowLeft size={17} />
            Back
          </button>

          <span
            className="
              text-sm
              font-bold
              text-gray-400
              dark:text-gray-500
            "
          >
            My Profile
          </span>
        </div>
      </div>

      {/* =========================
          PROFILE
      ========================= */}

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12">

        {/* PROFILE HEADER */}

        <div
          className="
            overflow-hidden
            rounded-3xl
            border
            border-gray-200
            bg-white
            shadow-sm
            transition-colors
            dark:border-gray-800
            dark:bg-gray-900
            dark:shadow-black/20
          "
        >
          {/* Cover */}

          <div className="relative h-44 bg-gradient-to-br from-indigo-600 via-purple-600 to-fuchsia-500 sm:h-56">
            <div className="absolute inset-0 bg-black/10" />

            <div
              className="
                absolute
                right-5
                top-5
                rounded-full
                border
                border-white/20
                bg-white/10
                px-4
                py-2
                text-xs
                font-bold
                text-white
                backdrop-blur
              "
            >
              Creator Profile
            </div>
          </div>

          {/* Profile content */}

          <div className="px-5 pb-7 sm:px-8 sm:pb-9">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">

              {/* Avatar */}

              <div className="-mt-16 relative w-fit">
                <div className="relative">
                  {photo ? (
                    <img
                      src={photo}
                      alt={name}
                      className="
                        h-32
                        w-32
                        rounded-3xl
                        border-4
                        border-white
                        object-cover
                        shadow-xl
                        dark:border-gray-900
                      "
                    />
                  ) : (
                    <div
                      className="
                        flex
                        h-32
                        w-32
                        items-center
                        justify-center
                        rounded-3xl
                        border-4
                        border-white
                        bg-gray-950
                        text-4xl
                        font-black
                        text-white
                        shadow-xl
                        dark:border-gray-900
                        dark:bg-indigo-600
                      "
                    >
                      {firstLetter}
                    </div>
                  )}

                  {editing && (
                    <button
                      type="button"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      className="
                        absolute
                        bottom-2
                        right-2
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-xl
                        border-2
                        border-white
                        bg-indigo-600
                        text-white
                        shadow-lg
                        transition
                        hover:bg-indigo-700
                      "
                      title="Change profile photo"
                    >
                      <Camera size={18} />
                    </button>
                  )}
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </div>

              {/* Buttons */}

              <div className="flex flex-wrap gap-3">
                {!editing ? (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setEditing(true)
                      }
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        px-5
                        py-2.5
                        text-sm
                        font-bold
                        text-gray-700
                        transition
                    
                        dark:border-gray-700
                        dark:bg-gray-800
                        dark:text-gray-200
                        
                      "
                    >
                      <Edit3 size={17} />
                      Edit Profile
                    </button>

                    <Link
                      to="/create"
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-indigo-600
                        px-5
                        py-2.5
                        text-sm
                        font-bold
                        text-white
                        transition
                        hover:bg-indigo-700
                      "
                    >
                      <PenLine size={17} />
                      Write a Post
                    </Link>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        px-5
                        py-2.5
                        text-sm
                        font-bold
                        text-gray-700
                        transition
       dark:border-gray-700
                        dark:bg-gray-800
                        dark:text-gray-200
                      "
                    >
                      <X size={17} />
                      Cancel
                    </button>

                    <button
                      type="button"
                      onClick={handleSave}
                      disabled={saving}
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        bg-indigo-600
                        px-5
                        py-2.5
                        text-sm
                        font-bold
                        text-white
                        transition
                        hover:bg-indigo-700
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      <Save size={17} />

                      {saving
                        ? "Saving..."
                        : "Save Changes"}
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* USER INFO */}

            <div className="mt-6 max-w-3xl">
              {!editing ? (
                <>
                  <h1
                    className="
                      text-3xl
                      font-black
                      tracking-tight
                      text-gray-950
                      sm:text-4xl
                      dark:text-white
                    "
                  >
                    {user.name}
                  </h1>

                  <div
                    className="
                      mt-3
                      flex
                      flex-wrap
                      items-center
                      gap-2
                      text-sm
                      text-gray-500
                      dark:text-gray-400
                    "
                  >
                    <Mail size={16} />
                    <span>{user.email}</span>
                  </div>

                  <p
                    className="
                      mt-5
                      max-w-2xl
                      text-[15px]
                      leading-7
                      text-gray-600
                      dark:text-gray-300
                    "
                  >
                    {user.description ||
                      defaultDescription}
                  </p>
                </>
              ) : (
                <div className="space-y-5">

                  {/* Name */}

                  <div>
                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-bold
                        text-gray-800
                        dark:text-gray-300
                      "
                    >
                      Your name
                    </label>

                    <input
                      type="text"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      placeholder="Enter your name"
                      className="
                        w-full
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50
                        px-4
                        py-3
                        text-sm
                        font-medium
                        text-gray-900
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-indigo-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-indigo-50
                        dark:border-gray-700
                        dark:bg-gray-800
                        dark:text-white
                        dark:placeholder:text-gray-500
                        dark:focus:bg-gray-800
                        dark:focus:ring-indigo-500/10
                      "
                    />
                  </div>

                  {/* Email */}

                  <div>
                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-bold
                        text-gray-800
                        dark:text-gray-300
                      "
                    >
                      Email
                    </label>

                    <div
                      className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-100
                        px-4
                        py-3
                        text-sm
                        text-gray-500
                        dark:border-gray-700
                        dark:bg-gray-800
                        dark:text-gray-400
                      "
                    >
                      <Mail size={17} />
                      {user.email}
                    </div>

                    <p
                      className="
                        mt-1.5
                        text-xs
                        text-gray-400
                        dark:text-gray-500
                      "
                    >
                      Email cannot be changed here.
                    </p>
                  </div>

                  {/* Description */}

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label
                        className="
                          text-sm
                          font-bold
                          text-gray-800
                          dark:text-gray-300
                        "
                      >
                        About you
                      </label>

                      <span
                        className="
                          text-xs
                          text-gray-400
                          dark:text-gray-500
                        "
                      >
                        {description.length}/300
                      </span>
                    </div>

                    <textarea
                      value={description}
                      onChange={(e) => {
                        if (
                          e.target.value.length <=
                          300
                        ) {
                          setDescription(
                            e.target.value
                          );
                        }
                      }}
                      rows={5}
                      placeholder="Tell people a little about yourself..."
                      className="
                        w-full
                        resize-none
                        rounded-xl
                        border
                        border-gray-200
                        bg-gray-50
                        px-4
                        py-3
                        text-sm
                        leading-7
                        text-gray-900
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-indigo-500
                        focus:bg-white
                        focus:ring-4
                        focus:ring-indigo-50
                        dark:border-gray-700
                        dark:bg-gray-800
                        dark:text-white
                        dark:placeholder:text-gray-500
                        dark:focus:bg-gray-800
                        dark:focus:ring-indigo-500/10
                      "
                    />
                  </div>

                  {/* Photo */}

                  <div>
                    <label
                      className="
                        mb-2
                        block
                        text-sm
                        font-bold
                        text-gray-800
                        dark:text-gray-300
                      "
                    >
                      Profile photo
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        fileInputRef.current?.click()
                      }
                      className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-xl
                        border
                        border-gray-200
                        bg-white
                        px-4
                        py-2.5
                        text-sm
                        font-bold
                        text-gray-700
                        transition
                        hover:bg-gray-50
                        dark:border-gray-700
                        dark:bg-gray-800
                        dark:text-gray-200
                        dark:hover:bg-gray-750
                      "
                    >
                      <Camera size={17} />
                      Change Photo
                    </button>

                    <p
                      className="
                        mt-2
                        text-xs
                        text-gray-400
                        dark:text-gray-500
                      "
                    >
                      JPG, PNG or WebP. Maximum 2MB.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =========================
            PROFILE STATS / INFO
        ========================= */}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">

          {/* Account */}

          <div
            className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-5
              shadow-sm
              transition-colors
              dark:border-gray-800
              dark:bg-gray-900
              dark:shadow-black/20
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-indigo-50
                  text-indigo-600
                  dark:bg-indigo-500/10
                  dark:text-indigo-400
                "
              >
                <User size={20} />
              </div>

              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-gray-400
                    dark:text-gray-500
                  "
                >
                  Account
                </p>

                <p
                  className="
                    mt-1
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  {user.name}
                </p>
              </div>
            </div>
          </div>

          {/* Writer */}

          <div
            className="
              rounded-2xl
              border
              border-gray-200
              bg-white
              p-5
              shadow-sm
              transition-colors
              dark:border-gray-800
              dark:bg-gray-900
              dark:shadow-black/20
            "
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-purple-50
                  text-purple-600
                  dark:bg-purple-500/10
                  dark:text-purple-400
                "
              >
                <FileText size={20} />
              </div>

              <div>
                <p
                  className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-gray-400
                    dark:text-gray-500
                  "
                >
                  Writer
                </p>

                <p
                  className="
                    mt-1
                    font-bold
                    text-gray-900
                    dark:text-white
                  "
                >
                  Share your ideas
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* =========================
            BOTTOM ACTIONS
        ========================= */}

        <div
          className="
            mt-6
            flex
            flex-col
            gap-4
            rounded-2xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-sm
            transition-colors
            dark:border-gray-800
            dark:bg-gray-900
            dark:shadow-black/20
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div>
            <h2
              className="
                font-bold
                text-gray-950
                dark:text-white
              "
            >
              Ready to share something?
            </h2>

            <p
              className="
                mt-1
                text-sm
                text-gray-500
                dark:text-gray-400
              "
            >
              Create an article and share your ideas
              with your readers.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/create"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-indigo-600
                px-5
                py-2.5
                text-sm
                font-bold
                text-white
                transition
                hover:bg-indigo-700
              "
            >
              <PenLine size={17} />
              Write a Post
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                rounded-xl
                border
                border-red-200
                px-5
                py-2.5
                text-sm
                font-bold
                text-red-600
                transition
                hover:bg-red-50
                dark:border-red-900/50
                dark:text-red-400
                dark:hover:bg-red-500/10
              "
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>
      </div>

    </main>
  );
}

export default Profile;