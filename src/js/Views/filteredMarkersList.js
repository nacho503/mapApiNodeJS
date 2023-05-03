class filteredMarkersList {
  constructor() {
    this.filteredClicked = [];
    this.markersOnMap = [];
  }

  closeList() {
    const butClose = document.getElementById(
      "close-filtered-markers-container"
    );
    const markersContainer = document.getElementById(
      "filtered-markers-container"
    );
    const markerList = document.getElementById("marker-list");
    const listItem = document.getElementById("marker-list-item");
    butClose.addEventListener("click", function () {
      // if (markerList && markersContainer.contains(markerList)) {
      //   markersContainer.removeChild(markerList);
      // }
      this.filteredClicked = [];
      markersContainer.style.display = "none";
    });
  }

  putMarkersOnMap(markersData, googlemap) {
    markersData.forEach((coord) => {
      const marker = new google.maps.Marker({
        position: { lat: coord.lat, lng: coord.long },
        map: googlemap,
        icon: {
          url: "https://cdn-icons-png.flaticon.com/128/10204/10204362.png",
          scaledSize: new google.maps.Size(40, 40),
        },
        data: {
          id: coord.id,
          address: coord.address,
          title: coord.title,
          amount: coord.amount,
          date: coord.date,
          descrip: coord.descrip,
          lat: coord.lat,
          long: coord.long,
          user_name: coord.user_name,
        },
      });
      this.markersOnMap.push(marker);
    });
    return this.markersOnMap;
  }

  //Receives the array of markers and logs the clicked
  markerClickHandler(markersOnMap) {
    let clusterDensity = 0.00003;
    for (let marker of markersOnMap) {
      google.maps.event.addListener(marker, "click", () => {
        let lat = marker.data.lat;
        let lng = marker.data.long;
        //1) calls the method to filter and return a filtered array of markers
        this.filteredClicked = this.markersFilterer(
          lat,
          lng,
          markersOnMap,
          clusterDensity
        );
        console.log(this.filteredClicked);
        // 2) this method uses the result of the previous to create the html elements
        this.markersListPopUp(this.filteredClicked);
      });
    }
  }

  //markers filterer: Receives a marker which is the one clicked, and returns a lust of markes on
  //an specific lat long range
  markersFilterer(lat, lng, markersOnMap, clusterDensity) {
    let filteredMarks = markersOnMap.filter((mark) => {
      return (
        mark.data.lat >= lat - clusterDensity &&
        mark.data.lat <= lat + clusterDensity &&
        mark.data.long >= lng - clusterDensity &&
        mark.data.long <= lng + clusterDensity
      );
    });
    return filteredMarks;
  }

  markersListPopUp(filteredMarks) {
    const markersContainer = document.getElementById(
      "filtered-markers-container"
    );
    markersContainer.style.display = "flex";
    const butClose = document.getElementById(
      "close-filtered-markers-container"
    );
    butClose.style.display = "block";
    let markerList = document.getElementById("marker-list");
    if (!markerList) {
      markerList = document.createElement("ul");
      markerList.setAttribute("id", "marker-list");
      markerList.classList.add("marker-list");
      markersContainer.appendChild(markerList);
    }
    markerList.innerHTML = ""; // Clear the existing list items

    //Iterates through the filtered data to display the html
    for (const marker of filteredMarks) {
      const listItem = document.createElement("li");
      listItem.classList.add("marker-list-item");
      const title = document.createElement("h3");
      title.classList.add("marker-list-item-title");
      title.textContent = `Title: ${marker.data.title}`;
      listItem.appendChild(title);

      const address = document.createElement("p");
      address.classList.add("marker-list-item-address");
      address.textContent = `Address: ${marker.data.address}`;
      listItem.appendChild(address);

      const date = document.createElement("p");
      date.classList.add("marker-list-item-date");
      date.textContent = `Date: ${marker.data.date}`;
      listItem.appendChild(date);

      const amount = document.createElement("p");
      amount.classList.add("marker-list-item-amount");
      amount.textContent = `Amount: ${marker.data.amount}`;
      listItem.appendChild(amount);

      markerList.appendChild(listItem);
    }
    markersContainer.appendChild(markerList);
  }
}

export default new filteredMarkersList();
