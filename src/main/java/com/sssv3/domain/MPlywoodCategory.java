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
 * A MPlywoodCategory.
 */
@Entity
@Table(name = "m_plywood_category")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class MPlywoodCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "nama", nullable = false)
    private String nama;

    @Lob
    @Column(name = "deskripsi")
    private String deskripsi;

    @Column(name = "tebal")
    private Double tebal;

    @Column(name = "panjang")
    private Double panjang;

    @Column(name = "lebar")
    private Double lebar;

    @Column(name = "harga_beli")
    private Double hargaBeli;

    @Column(name = "harga_jual")
    private Double hargaJual;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @Column(name = "created_on")
    private LocalDate createdOn;

    @OneToMany(mappedBy = "plywoodcategory")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<MPlywood> mplywoods = new HashSet<>();
    @ManyToOne
    @JsonIgnoreProperties("")
    private User createdby;

    @ManyToOne
    @JsonIgnoreProperties("plywoodcategories")
    private MPlywoodGrade plywoodgrade;

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

    public MPlywoodCategory nama(String nama) {
        this.nama = nama;
        return this;
    }

    public void setNama(String nama) {
        this.nama = nama;
    }

    public String getDeskripsi() {
        return deskripsi;
    }

    public MPlywoodCategory deskripsi(String deskripsi) {
        this.deskripsi = deskripsi;
        return this;
    }

    public void setDeskripsi(String deskripsi) {
        this.deskripsi = deskripsi;
    }

    public Double getTebal() {
        return tebal;
    }

    public MPlywoodCategory tebal(Double tebal) {
        this.tebal = tebal;
        return this;
    }

    public void setTebal(Double tebal) {
        this.tebal = tebal;
    }

    public Double getPanjang() {
        return panjang;
    }

    public MPlywoodCategory panjang(Double panjang) {
        this.panjang = panjang;
        return this;
    }

    public void setPanjang(Double panjang) {
        this.panjang = panjang;
    }

    public Double getLebar() {
        return lebar;
    }

    public MPlywoodCategory lebar(Double lebar) {
        this.lebar = lebar;
        return this;
    }

    public void setLebar(Double lebar) {
        this.lebar = lebar;
    }

    public Double getHargaBeli() {
        return hargaBeli;
    }

    public MPlywoodCategory hargaBeli(Double hargaBeli) {
        this.hargaBeli = hargaBeli;
        return this;
    }

    public void setHargaBeli(Double hargaBeli) {
        this.hargaBeli = hargaBeli;
    }

    public Double getHargaJual() {
        return hargaJual;
    }

    public MPlywoodCategory hargaJual(Double hargaJual) {
        this.hargaJual = hargaJual;
        return this;
    }

    public void setHargaJual(Double hargaJual) {
        this.hargaJual = hargaJual;
    }

    public Status getStatus() {
        return status;
    }

    public MPlywoodCategory status(Status status) {
        this.status = status;
        return this;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public LocalDate getCreatedOn() {
        return createdOn;
    }

    public MPlywoodCategory createdOn(LocalDate createdOn) {
        this.createdOn = createdOn;
        return this;
    }

    public void setCreatedOn(LocalDate createdOn) {
        this.createdOn = createdOn;
    }

    public Set<MPlywood> getMplywoods() {
        return mplywoods;
    }

    public MPlywoodCategory mplywoods(Set<MPlywood> mPlywoods) {
        this.mplywoods = mPlywoods;
        return this;
    }

    public MPlywoodCategory addMplywood(MPlywood mPlywood) {
        this.mplywoods.add(mPlywood);
        mPlywood.setPlywoodcategory(this);
        return this;
    }

    public MPlywoodCategory removeMplywood(MPlywood mPlywood) {
        this.mplywoods.remove(mPlywood);
        mPlywood.setPlywoodcategory(null);
        return this;
    }

    public void setMplywoods(Set<MPlywood> mPlywoods) {
        this.mplywoods = mPlywoods;
    }

    public User getCreatedby() {
        return createdby;
    }

    public MPlywoodCategory createdby(User user) {
        this.createdby = user;
        return this;
    }

    public void setCreatedby(User user) {
        this.createdby = user;
    }

    public MPlywoodGrade getPlywoodgrade() {
        return plywoodgrade;
    }

    public MPlywoodCategory plywoodgrade(MPlywoodGrade mPlywoodGrade) {
        this.plywoodgrade = mPlywoodGrade;
        return this;
    }

    public void setPlywoodgrade(MPlywoodGrade mPlywoodGrade) {
        this.plywoodgrade = mPlywoodGrade;
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
        MPlywoodCategory mPlywoodCategory = (MPlywoodCategory) o;
        if (mPlywoodCategory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), mPlywoodCategory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "MPlywoodCategory{" +
            "id=" + getId() +
            ", nama='" + getNama() + "'" +
            ", deskripsi='" + getDeskripsi() + "'" +
            ", tebal=" + getTebal() +
            ", panjang=" + getPanjang() +
            ", lebar=" + getLebar() +
            ", hargaBeli=" + getHargaBeli() +
            ", hargaJual=" + getHargaJual() +
            ", status='" + getStatus() + "'" +
            ", createdOn='" + getCreatedOn() + "'" +
            "}";
    }
}
