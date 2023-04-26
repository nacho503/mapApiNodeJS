class filteredMarkersList {
  // This function receives markerData that is already filtered according the range given and
  // it receives markerList html element

  markersHandlerClicked(markersData, googlemap) {
    let clusterDensity = 0.00003;
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
      //Logic inside marker scope, it filters the whole array of markers, based on clusterDensity
      marker.addListener("click", function () {
        function filtererOnClick(lat, long) {
          let filteredMarksOnMap = markersData.filter((mark) => {
            return (
              mark.lat >= lat - clusterDensity &&
              mark.lat <= lat + clusterDensity &&
              mark.long >= long - clusterDensity &&
              mark.long <= long + clusterDensity
            );
          });
          return filteredMarksOnMap;
        }
        // Object to pass into createMarkerList
        const filteredClicked = filtererOnClick(
          marker.data.lat,
          marker.data.long
        );

        //Function to append filtered markers to dom elements
        function createMarkerList(markerData) {
          const markersContainer = document.getElementById(
            "filtered-markers-container"
          );
          markersContainer.style.display = "flex";
          const markerList = document.createElement("ul");
          markerList.classList.add("marker-list");
          //
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

          markersContainer.appendChild(markerList);
        }

        createMarkerList(filteredClicked);
        filtererOnClick(marker.data.lat, marker.data.long);
        //End of marker.addEventLisyener('click)
      });

      //End of markersData.ForEach
    });
  }
}

export default new filteredMarkersList();
