import Store from "../../models/store/store.js";

const storeController = {
  createStore: async (req, res) => {
    const { name, urlSlug } = req.body;

    try {
      const store = new Store({
        name,
        urlSlug: urlSlug.toLowerCase(),
      });
      await store.save();
      res.json(store);
    } catch (error) {
      console.error("Create store failed:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getStoreBySlug: async (req, res) => {
    const { urlSlug } = req.query;

    try {
      const store = await Store.findOne({ urlSlug: urlSlug.toLowerCase() });
      if (!store) {
        return res.status(404).json({ message: "Store not found" });
      }
      res.json(store);
    } catch (error) {
      console.error("Get store by slug failed:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default storeController;
