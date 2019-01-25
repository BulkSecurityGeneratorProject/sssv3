package com.sssv3.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.sssv3.domain.enumeration.Status;

/**
 * A MEkspedisi.
 */
@Entity
@Table(name = "m_ekspedisi")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MEkspedisi implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nama", nullable = false)
    private String nama;

    @Column(name = "telepon")
    private Long telepon;

    @Column(name = "mobilephone")
    private Long mobilephone;

    @Lob
    @Column(name = "alamat")
    private String alamat;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "created_on")
    private LocalDate createdOn;

    @OneToMany(mappedBy = "ekpedisi")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Transaksi> transaksis = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("")
    private User createdby;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNama() {
        return nama;
    }

    public MEkspedisi nama(String nama) {
        this.nama = nama;
        return this;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public Long getTelepon() {
        return telepon;
    }

    public MEkspedisi telepon(Long telepon) {
        this.telepon = telepon;
        return this;
    }

    public void setTelepon(Long telepon) {
        this.telepon = telepon;
    }

    public Long getMobilephone() {
        return mobilephone;
    }

    public MEkspedisi mobilephone(Long mobilephone) {
        this.mobilephone = mobilephone;
        return this;
    }

    public void setMobilephone(Long mobilephone) {
        this.mobilephone = mobilephone;
    }

    public String getAlamat() {
        return alamat;
    }

    public MEkspedisi alamat(String alamat) {
        this.alamat = alamat;
        return this;
    }

    public void setAlamat(String alamat) {
        this.alamat = alamat;
    }

    public Status getStatus() {
        return status;
    }

    public MEkspedisi status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public MEkspedisi createdOn(LocalDate createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public Set<Transaksi> getTransaksis() {
        return transaksis;
    }

    public MEkspedisi transaksis(Set<Transaksi> transaksis) {
        this.transaksis = transaksis;
        return this;
    }

    public MEkspedisi addTransaksi(Transaksi transaksi) {
        this.transaksis.add(transaksi);
        transaksi.setEkpedisi(this);
        return this;
    }

    public MEkspedisi removeTransaksi(Transaksi transaksi) {
        this.transaksis.remove(transaksi);
        transaksi.setEkpedisi(null);
        return this;
    }

    public void setTransaksis(Set<Transaksi> transaksis) {
        this.transaksis = transaksis;
    }

    public User getCreatedby() {
        return createdby;
    }

    public MEkspedisi createdby(User user) {
        this.createdby = user;
        return this;
    }

    public void setCreatedby(User user) {
        this.createdby = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        MEkspedisi mEkspedisi = (MEkspedisi) o;
        if (mEkspedisi.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mEkspedisi.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MEkspedisi{" +
            "id=" + getId() +
            ", nama='" + getNama() + "'" +
            ", telepon=" + getTelepon() +
            ", mobilephone=" + getMobilephone() +
            ", alamat='" + getAlamat() + "'" +
            ", status='" + getStatus() + "'" +
            ", createdOn='" + getCreatedOn() + "'" +
            "}";
    }
}