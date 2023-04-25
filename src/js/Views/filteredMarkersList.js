class filteredMarkersList {
  // This function receives markerData that is already filtered according the range given and
  // it receives markerList html element
  markersListMaker(markerData, markerList) {
    for (const marker of markerData) {
      const listItem = document.createElement("li");
      listItem.classList.add("marker-list-item");

      const title = document.createElement("h3");
      title.classList.add("marker-list-item-title");
      title.textContent = marker.title;
      listItem.appendChild(title);

      const address = document.createElement("p");
      address.classList.add("marker-list-item-address");
      address.textContent = marker.address;
      listItem.appendChild(address);

      const date = document.createElement("p");
      date.classList.add("marker-list-item-date");
      date.textContent = marker.date;
      listItem.appendChild(date);

      const amount = document.createElement("p");
      amount.classList.add("marker-list-item-amount");
      amount.textContent = marker.amount;
      listItem.appendChild(amount);

      const description = document.createElement("p");
      description.classList.add("marker-list-item-description");
      description.textContent = marker.description;
      listItem.appendChild(description);

      markerList.appendChild(listItem);
    }
  }
}

export default new filteredMarkersList();
