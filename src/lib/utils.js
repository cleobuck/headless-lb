export function formatCategories(categories) {
  // Create a map to store categories by their ID for quick lookup

  const categoryMap = categories.reduce((map, category) => {
    map[category.id] = category;
    return map;
  }, {});

  // Function to recursively build category tree
  function buildCategoryTree(categoryId) {
    const category = categoryMap[categoryId];
    if (!category) return null;

    // Create a new object with only the necessary properties
    const formattedCategory = {
      id: category.id,
      name: category.name,
      children: [],
    };

    // Recursively build children
    const children = categories.filter((child) => child.parent === category.id);
    children.forEach((child) => {
      const formattedChild = buildCategoryTree(child.id);
      if (formattedChild) {
        formattedCategory.children.push(formattedChild);
      }
    });

    if (formattedCategory.children.length === 0) {
      delete formattedCategory.children;
    }

    return formattedCategory;
  }

  // Filter out top-level categories whose parent is 0
  const topLevelCategories = categories.filter(
    (category) => category.parent === 0
  );

  // Build the category tree for each top-level category
  const formattedCategories = topLevelCategories.map((category) =>
    buildCategoryTree(category.id)
  );

  return formattedCategories;
}
