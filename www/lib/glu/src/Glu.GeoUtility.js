/**
 * Copyright (c) 2011 Nick Tackes, Travis Barajas and Michael Gai
 *
 * Permission is not granted, without the express consent of Nick Tackes, Travis Barajas and Michael Gai, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software, including the rights to use, copy, modify, merge, publish, distribute, sub-license, and/or sell
 * copies of the Software.
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 *
 */
// ensure the Argon namespace exists
var Argon = Argon || {};

// Singleton GeoUtility to assist with Geolocation needs
Argon.GeoUtility = function() {
    return {
        getId: function(place) {
            return place.id;
        },
        getName: function(place) {
            return place.name;
        },
        getPhone: function(place){
            return place.formatted_phone_number;
        },
        getAddress: function(place) {
            var address = {};
            var addressComponents = place.address_components;
            if (addressComponents && Ext.isArray(addressComponents) && addressComponents.length > 0) {
                var streetNumber = Argon.GeoUtility.findStreetNumber(addressComponents);
                if (streetNumber) {
                    address['streetNumber'] = streetNumber;
                }
                var route = Argon.GeoUtility.findRoute(addressComponents);
                if (route) {
                    address['route'] = route;
                }
                var locality = Argon.GeoUtility.findLocality(addressComponents);
                if (locality) {
                    address['locality'] = locality;
                }
                var administrativeAreaLevel1 = Argon.GeoUtility.findAdministrativeAreaLevel1(addressComponents);
                if (administrativeAreaLevel1) {
                    address['administrativeAreaLevel1'] = administrativeAreaLevel1;
                }
                var administrativeAreaLevel2 = Argon.GeoUtility.findAdministrativeAreaLevel2(addressComponents);
                if (administrativeAreaLevel2) {
                    address['administrativeAreaLevel2'] = administrativeAreaLevel2;
                }
                var administrativeAreaLevel3 = Argon.GeoUtility.findAdministrativeAreaLevel3(addressComponents);
                if (administrativeAreaLevel3) {
                    address['administrativeAreaLevel3'] = administrativeAreaLevel3;
                }
                var country = Argon.GeoUtility.findCountry(addressComponents);
                if (country) {
                    address['country'] = country;
                }
                var postalCode = Argon.GeoUtility.findPostalCode(addressComponents);
                if (postalCode) {
                    address['postalCode'] = postalCode;
                }
            }
            return address;
        },
        getLng: function(place) {
            return place.geometry.location.lng();
        },
        getLat: function(place) {
            return place.geometry.location.lat();
        },
        getFormattedAddress: function(place) {
            return place.formatted_address;
        },
        findStreetNumber: function(addressComponents) {
            for (var i = 0; i < addressComponents.length; i++) {
                if (addressComponents[i].long_name && addressComponents[i].types && Ext.isArray(addressComponents[i].types) && addressComponents[i].types.length > 0 && addressComponents[i].types[0] == 'street_number') {
                    return addressComponents[i].long_name;
                }
            }
            return null;
        },
        findRoute: function(addressComponents) {
            for (var i = 0; i < addressComponents.length; i++) {
                if (addressComponents[i].long_name && addressComponents[i].types && Ext.isArray(addressComponents[i].types) && addressComponents[i].types.length > 0 && addressComponents[i].types[0] == 'route') {
                    return addressComponents[i].long_name;
                }
            }
            return null;
        },
        findLocality: function(addressComponents) {
            for (var i = 0; i < addressComponents.length; i++) {
                if (addressComponents[i].long_name && addressComponents[i].types && Ext.isArray(addressComponents[i].types) && addressComponents[i].types.length > 0 && addressComponents[i].types[0] == 'locality') {
                    return addressComponents[i].long_name;
                }
            }
            return null;
        },
        findAdministrativeAreaLevel1: function(addressComponents) {
            for (var i = 0; i < addressComponents.length; i++) {
                if (addressComponents[i].long_name && addressComponents[i].types && Ext.isArray(addressComponents[i].types) && addressComponents[i].types.length > 0 && addressComponents[i].types[0] == 'administrative_area_level_1') {
                    return addressComponents[i].short_name;
                }
            }
            return null;
        },
        findAdministrativeAreaLevel2: function(addressComponents) {
            for (var i = 0; i < addressComponents.length; i++) {
                if (addressComponents[i].long_name && addressComponents[i].types && Ext.isArray(addressComponents[i].types) && addressComponents[i].types.length > 0 && addressComponents[i].types[0] == 'administrative_area_level_2') {
                    return addressComponents[i].short_name;
                }
            }
            return null;
        },
        findAdministrativeAreaLevel3: function(addressComponents) {
            for (var i = 0; i < addressComponents.length; i++) {
                if (addressComponents[i].long_name && addressComponents[i].types && Ext.isArray(addressComponents[i].types) && addressComponents[i].types.length > 0 && addressComponents[i].types[0] == 'administrative_area_level_3') {
                    return addressComponents[i].short_name;
                }
            }
            return null;
        },
        findCountry: function(addressComponents) {
            for (var i = 0; i < addressComponents.length; i++) {
                if (addressComponents[i].long_name && addressComponents[i].types && Ext.isArray(addressComponents[i].types) && addressComponents[i].types.length > 0 && addressComponents[i].types[0] == 'country') {
                    return addressComponents[i].short_name;
                }
            }
            return null;
        },
        findPostalCode: function(addressComponents) {
            for (var i = 0; i < addressComponents.length; i++) {
                if (addressComponents[i].long_name && addressComponents[i].types && Ext.isArray(addressComponents[i].types) && addressComponents[i].types.length > 0 && addressComponents[i].types[0] == 'postal_code') {
                    return addressComponents[i].short_name;
                }
            }
            return null;
        }
    }
}();

// TESTS


